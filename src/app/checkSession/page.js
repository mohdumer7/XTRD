import { getServerSession } from "next-auth";

export default async function checkSession() {
  const isSession = async () => {
    "use server";
    const session = await getServerSession();
    return session;
  };
}
