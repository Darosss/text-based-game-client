"use client";

import { FC, useEffect, useState } from "react";
import styles from "./leaderboards.module.scss";
import { useFetch } from "@/hooks/useFetch";
import { LeaderboardsResponse } from "@/api/types";
import { Button, FetchingInfo } from "../common";
import { LeaderboardsCategories } from "@/api/enums";

export const Leaderboards: FC = () => {
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
    console.log("ey");
    fetchData();
  }, [currentCategory, fetchData]);

  if (!data || error)
    return (
      <FetchingInfo
        isPending={isPending}
        error={error || "Leaderboard data does not exist. Try again later"}
      />
    );
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
            <div>{leaderboardData.username}</div>
            <div>{leaderboardData.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
