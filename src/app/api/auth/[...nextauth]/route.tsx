import DBUser, { IUser } from "@/models/user";
import { connectToDB } from "@/utils/database";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface CustomSession extends Session {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}


const googleClientId = process.env.GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_SECRET_ID;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing Google OAuth environment variables");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      await connectToDB();

      const user = (await DBUser.findOne({
        email: session.user?.email,
      })) as IUser | null;


      const newSession:CustomSession = {
        ...session,
        user: {
          ...session.user,
          id : user?._id.toString()
        }
      }

      return newSession;
    },

    async signIn(params) {
      try {
        await connectToDB();
        //check if user already exsit
        const userExist = await DBUser.findOne({ email:  params.profile?.email });

        //if not, create a new user
        if (!userExist) {
          await DBUser.create({
            email: params.profile?.email,
            username: params.profile?.name?.replace(/\s/g, "").toLowerCase(),
            image: params.profile?.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

  },
});

export { handler as GET, handler as POST };
