import accountApiRequest from "@/apiRequests/account.api";
import { cookies } from "next/headers";

const Dashboard = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;
  const res = await accountApiRequest.sMe(accessToken);
  return <div>Dashboard {res.payload.data.name}</div>;
};

export default Dashboard;
