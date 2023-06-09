import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";

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

  const isProMember =
    customerInfo?.activeSubcsriptions.includes(typesOfMembership.weekly) ||
    customerInfo?.activeSubcsriptions.includes(typesOfMembership.monthly);

  useEffect(() => {
    const fetchData = async () => {
      console.log("DEBUG", APIKeys.apple);
      Purchases.logLevel(true);

      if (Platform.OS === "ios") {
        console.log("DEBUG", APIKeys.apple);
        await Purchases.configure({ apiKey: typesOfMembership.apple });
      } else if (Platform.OS === "android") {
        await Purchases.configure({ apiKey: typesOfMembership.google });
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
