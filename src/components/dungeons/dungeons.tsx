"use client";

import { useFetch } from "@/hooks/useFetch";
import { FC, useEffect, useState } from "react";
import styles from "./dungeons.module.scss";
import { DungeonsResponse } from "./types";
import { DungeonDetails } from "./dungeon-details";
import { DungeonActions } from "./dungeon-actions";
import { useUserContext } from "@/components/user";

export const Dungeons: FC = () => {
  const {
    apiUser: { fetchData: fetchUserData },
  } = useUserContext();

  const {
    api: {
      isPending,
      error,
      responseData: { data },
    },
    fetchData,
  } = useFetch<DungeonsResponse>({
    url: "dungeons",
    method: "GET",
  });
  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    if (data) setCurrentLevel(data.currentLevel);
  }, [data]);

  if (!data) return <></>;

  const handleOnIncreaseCurrentLevel = () => {
    setCurrentLevel((prevState) => Math.min(data.currentLevel, prevState + 1));
  };
  const handleOnDecreaseCurrentLevel = () => {
    setCurrentLevel((prevState) => Math.max(1, prevState - 1));
  };

  return (
    <div className={styles.dungeonsWrapper}>
      <div>
        <h2>Current level: {currentLevel}</h2>
      </div>

      <DungeonDetails
        currentMaxLevel={data.currentLevel}
        decreaseCurrentLevel={handleOnDecreaseCurrentLevel}
        increaseCurrentLevel={handleOnIncreaseCurrentLevel}
        data={data.completedDungeons.at(currentLevel - 1)}
      />

      <DungeonActions
        dungeonLevel={currentLevel}
        canFightDate={new Date(data.canFightDate)}
        onConfirmReport={() => {
          fetchData();
          fetchUserData();
        }}
      />
    </div>
  );
};
