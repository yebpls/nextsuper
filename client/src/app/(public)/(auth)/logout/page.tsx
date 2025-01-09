"use client";

import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const accessTokenFromUrl = searchParams.get("accessToken");
  console.log(
    "1",
    refreshTokenFromUrl &&
      refreshTokenFromUrl !== getRefreshTokenFromLocalStorage()
  );
  console.log(
    "2",
    accessTokenFromUrl &&
      accessTokenFromUrl !== getAccessTokenFromLocalStorage()
  );

  useEffect(() => {
    if (
      (refreshTokenFromUrl &&
        refreshTokenFromUrl !== getRefreshTokenFromLocalStorage()) ||
      (accessTokenFromUrl &&
        accessTokenFromUrl !== getAccessTokenFromLocalStorage())
    ) {
      return;
    }
    mutateAsync().then((res) => {
      console.log(res);

      router.push("/login");
    });
  }, [router, mutateAsync, refreshTokenFromUrl, accessTokenFromUrl]);
  return <div>LogoutPage</div>;
};

export default LogoutPage;
