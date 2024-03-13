import { fetchBackendApi } from "@/api/fetch";
import { MercenaryCharacter } from "@/api/types";
import { Button } from "@/components/common";
import { FC } from "react";

type HeroMercenaryCreateProps = {
  onCreateMercenary: () => void;
};

export const HeroMercenaryCreate: FC<HeroMercenaryCreateProps> = ({
  onCreateMercenary,
}) => {
  return (
    <Button
      defaultButtonType="info"
      onClick={() => {
        fetchBackendApi<MercenaryCharacter>({
          url: "characters/create-mercenary",
          method: "POST",
          notification: {
            pendingText: "Trying to create mercenary character. Please wait",
          },
        }).then((response) => {
          if (response?.body.data) onCreateMercenary();
        });
      }}
    >
      +
    </Button>
  );
};
