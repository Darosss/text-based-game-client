"use client";

import { FC, useEffect, useState } from "react";
import styles from "./leaderboards.module.scss";
import { useFetch } from "@/hooks/useFetch";
import { LeaderboardsResponse } from "@/api/types";
import { Button, FetchingInfo } from "../common";
import { LeaderboardsCategories } from "@/api/enums";
import { useRouter } from "next/navigation";

export const Leaderboards: FC = () => {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState(
    LeaderboardsCategories.LEVELS
  );
  const {
    api: {
      isPending,
      error,
      responseData: { data },
    },
    fetchData,
  } = useFetch<LeaderboardsResponse>(
    {
      url: `leaderboards/category/${currentCategory}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    fetchData();
  }, [currentCategory, fetchData]);

  if (!data || error)
    return <FetchingInfo isPending={isPending} error={error} />;
  return (
    <div className={styles.leaderboardsWrapper}>
      <div className={styles.leaderboarsCategoriesWrapper}>
        {Object.values(LeaderboardsCategories).map((category) => (
          <Button
            key={category}
            defaultButtonType={`${
              category === data.category ? "success" : "primary"
            }`}
            onClick={() => setCurrentCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className={styles.leaderboardDataWrapper}>
        <div>
          <div> Nr. </div>
          <div> Username </div>
          <div> Value </div>
        </div>
        {data.data.map((leaderboardData) => (
          <div key={leaderboardData.place + leaderboardData.userId}>
            <div>{leaderboardData.place}</div>
            <div>
              <Button
                defaultButtonType="primary"
                onClick={() =>
                  router.push(`overview/user/${leaderboardData.userId}`)
                }
              >
                {leaderboardData.username}
              </Button>
            </div>
            <div>{leaderboardData.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
