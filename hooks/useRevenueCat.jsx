import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases from "react-native-purchases";

const APIKeys = {
  apple: "appl_WgUeZxmxNnBTlKDYpucGQIyrNAC",
  google: "revenue_API_key_for_google",
};

const typesOfMembership = {
  weekly: "weekly_subscription",
  monthly: "monthly_subscription",
};

function useRevenueCat() {
  const [currentOffering, setCurrentOffering] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);

  const isProMember = customerInfo?.entitlements.active.pro;

  useEffect(() => {
    const fetchData = async () => {
      if (Platform.OS === "ios") {
        await Purchases.configure({ apiKey: APIKeys.apple });
      } else if (Platform.OS === "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      }

      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.getCustomerInfo();

      setCurrentOffering(offerings.current);
      setCustomerInfo(customerInfo);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);

  return { currentOffering, customerInfo, isProMember };
}

export default useRevenueCat;
