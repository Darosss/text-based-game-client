import { Button } from "@/components/common/button";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { formatTime } from "@/utils/utils";
import { useMerchantContext } from "./merchant-context";
import { FC, useEffect } from "react";

type MerchantCommodityTimerProps = {
  commodityRefreshAt: string;
};

export const MerchantCommodityTimer: FC<MerchantCommodityTimerProps> = ({
  commodityRefreshAt,
}) => {
  const commodityRemainingTime = useCountdownTimer({
    toTimestamp: commodityRefreshAt,
  });

  const {
    apiMerchant: { fetchData },
  } = useMerchantContext();

  useEffect(() => {
    if (commodityRemainingTime === 0) {
      fetchData();
    }
  }, [fetchData, commodityRemainingTime]);

  return (
    <>
      <div>{formatTime(commodityRemainingTime)}</div>
      <div>
        <Button defaultButtonType="info">Refresh (soon)</Button>
      </div>
    </>
  );
};
