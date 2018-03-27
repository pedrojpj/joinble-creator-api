const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLID
} = require('graphql');

const UserModel = require('./userModel');
const UserSchema = require('./userSchema');
const { UserInput, LoginInput, ProfileInput } = require('./userInput');
const {
  SecureService,
  ErrorService,
  EmailService
} = require('../../../lib/services');
const { ErrorSchema } = require('../error');
const { TokenSchema, TokenModel } = require('../token');

const UserMutation = {
  login: {
    type: new GraphQLObjectType({
      name: 'Login',
      fields: {
        errors: { type: new GraphQLList(ErrorSchema) },
        user: { type: UserSchema },
        token: { type: TokenSchema }
      }
    }),
    args: {
      login: {
        type: LoginInput
      }
    },
    async resolve(root, args) {
      let errors = [];
      let user = null;
      let token = null;

      const login = {
        ...args.login,
        password: SecureService.encodePassword(args.login.password)
      };

      const userEmail = await UserModel.findOne({ email: login.email });

      if (!userEmail) {
        errors.push(...[{ key: 'email', value: 'This user does not exist' }]);
      } else {
        user = await UserModel.findOne(login);

        if (!user) {
          errors.push(
            ...[{ key: 'password', value: 'The password is incorrect' }]
          );
        } else {
          token = SecureService.getToken({ id: user._id.toString() });
          await TokenModel.find({ userId: user._id }).remove();
          let newToken = new TokenModel({
            userId: user._id,
            token: token,
            lastLogin: new Date()
          });
          token = await newToken.save();
        }
      }

      return { errors, user, token };
    }
  },
  createUser: {
    type: new GraphQLObjectType({
      name: 'createUser',
      fields: {
        errors: { type: new GraphQLList(ErrorSchema) },
        user: { type: UserSchema },
        token: { type: TokenSchema }
      }
    }),
    args: {
      user: {
        type: new GraphQLNonNull(UserInput)
      }
    },
    async resolve(root, args) {
      let errors = [];
      let user;
      let token;

      let checkUser = await UserModel.findOne({ email: args.user.email });

      if (checkUser) {
        errors.push(
          ...[{ key: 'email', value: 'This email is already registered' }]
        );
      } else if (!args.user.conditions) {
        errors.push(
          ...[
            {
              key: 'conditions',
              value: 'It is mandatory to accept the conditions of use'
            }
          ]
        );
      } else {
        args.user.password = SecureService.encodePassword(args.user.password);

        let newEmail = new UserModel(args.user);
        user = await newEmail.save();
        token = SecureService.getToken({ id: user._id.toString() });
        let newToken = new TokenModel({
          userId: user._id,
          token: token,
          lastLogin: new Date()
        });
        token = await newToken.save();
      }

      return { errors, token, user };
    }
  },
  updateUser: {
    type: new GraphQLObjectType({
      name: 'updateUser',
      fields: {
        errors: { type: new GraphQLList(ErrorSchema) },
        user: { type: UserSchema }
      }
    }),
    args: {
      user: {
        type: new GraphQLNonNull(ProfileInput)
      }
    },
    async resolve(root, args) {
      let user;
      let errors = [];

      ErrorService.secure(root);

      user = await UserModel.findOneAndUpdate(
        { email: root.user.email },
        { $set: { ...args.user } },
        {
          new: true,
          fields: { name: 1, email: 1, country: 1, city: 1, address: 1 }
        }
      ).exec();

      if (!user) {
        ErrorService.getError();
      }

      return {
        user,
        errors
      };
    }
  },
  forgetPassword: {
    type: new GraphQLObjectType({
      name: 'forgetPassword',
      fields: {
        errors: { type: new GraphQLList(ErrorSchema) },
        status: { type: GraphQLBoolean }
      }
    }),
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(root, args) {
      let errors = [];
      let status;

      let user = await UserModel.findOne(args);

      if (!user) {
        errors.push(...[{ key: 'email', value: 'This user does not exist' }]);
        status = false;
      } else {
        let resetPasswordToken = SecureService.generateTokenPass(user.email);
        let userUpdate = await UserModel.updateOne(
          { email: user.email },
          { resetPasswordToken }
        );

        if (process.env.NODE_ENV === 'production') {
          EmailService.sendForgetPassword(user.email, resetPasswordToken);
        }

        if (!userUpdate) {
          errors.push(...[{ key: 'user', value: 'Generic error' }]);
        } else {
          status = true;
        }
      }

      return { errors, status };
    }
  },
  logout: {
    type: new GraphQLObjectType({
      name: 'logout',
      fields: {
        status: { type: GraphQLBoolean }
      }
    }),
    args: {
      token: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(root, args) {
      ErrorService.secure(root);

      let status;

      await TokenModel.find({ token: args.token }).remove();
      status = true;

      return { status };
    }
  },
  changePassword: {
    type: new GraphQLObjectType({
      name: 'changePassword',
      fields: {
        errors: { type: new GraphQLList(ErrorSchema) },
        status: { type: GraphQLBoolean }
      }
    }),
    args: {
      token: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(root, args) {
      let errors = [];
      let status;

      const parameters = { resetPasswordToken: args.token };

      const findUser = await UserModel.findOne(parameters);

      if (findUser) {
        if (findUser.password === SecureService.encodePassword(args.password)) {
          errors.push(
            ...[
              {
                key: 'repeatPassword',
                value: 'The new password cannot match the old one'
              }
            ]
          );
          status = false;
        } else {
          const updateUser = await UserModel.updateOne(parameters, {
            password: SecureService.encodePassword(args.password),
            resetPasswordToken: null
          });

          if (updateUser) {
            status = true;
          } else {
            ErrorService.getError();
          }
        }
      } else {
        ErrorService.getError();
      }

      return { errors, status };
    }
  }
};

module.exports = UserMutation;
