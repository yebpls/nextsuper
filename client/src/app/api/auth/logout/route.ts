import authApiRequest from "@/apiRequests/auth.api";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: "Không nhận được token",
      },
      {
        status: 200,
      }
    );
  }

  try {
    const result = await authApiRequest.sLogout({
      accessToken,
      refreshToken,
    });

    return Response.json(result.payload);
  } catch (error) {
    console.log(error);

    return Response.json({
      message: "Lỗi không xác định khi gọi đến server",
      status: 200,
    });
  }
}
