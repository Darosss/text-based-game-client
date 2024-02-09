"use client";

import { Character } from "@/api/types";
import { useFetch } from "@/hooks/useFetch";
import styles from "./character-management.module.scss";
import Image from "next/image";
import { Equipment } from "../equipment/equipment";
import { Inventory } from "@/components/inventory/inventory";

export const CharacterManagement = () => {
  const {
    api: { isPending, error, data },
    fetchData,
  } = useFetch<Character>({
    url: "your-main-character",
    method: "GET",
  });

  if (!data) return <></>;
  return (
    <div className={styles.characterWrapper}>
      <div className={styles.characterDetailsLeft}>
        <div className={styles.characterAvatar}>
          <Image src="/images/hero-placeholder.png" alt="hero img" fill />
        </div>
        <div className={styles.userInventory}>
          <Inventory />
        </div>
      </div>
      <div className={styles.characterDetailsRight}>
        <div>
          <Equipment equipment={data.equipment} />
        </div>
      </div>
    </div>
  );
};
