import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { bgColor } from "../../constants/ColorsUI";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";

export default function PrivacyPolicy({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView className="p-4">
        <TouchableOpacity
          className={`bg-[${bgColor}] items-center justify-center h-11 w-11 rounded-xl`}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-[24px] mt-4 mb-5 text-white">Privacy Policy</Text>
        <Text className="text-white font-extralight">
          WaterDrop App prioritizes your privacy. We are committed to
          maintaining the accuracy, confidentiality, and security of your
          personally identifiable information ("Personal Information"). As part
          of this commitment, our privacy policy governs our actions as they
          relate to the collection, use, and disclosure of Personal Information.
          Our privacy policy is based upon the values set by the Canadian
          Standards Association's Model Code for the Protection of Personal
          Information and Canada's Personal Information Protection and
          Electronic Documents Act.
        </Text>

        <Text className="text-white text-[18px] my-3">1. Introduction</Text>
        <Text className="text-white font-extralight">
          We are responsible for maintaining and protecting the Personal
          Information under our control. We have designated an individual or
          individuals who is/are responsible for compliance with our privacy
          policy.
        </Text>

        <Text className="text-white text-[18px] my-3">
          2. Identifying Purposes
        </Text>
        <Text className="text-white font-extralight">
          We collect, use and disclose Personal Information to provide you with
          the product or service you have requested and to offer you additional
          products and services we believe you might be interested in. The
          purposes for which we collect Personal Information will be identified
          before or at the time we collect the information. In certain
          circumstances, the purposes for which information is collected may be
          clear, and consent may be implied, such as where your name, address
          and payment information is provided as part of the order process.
        </Text>

        <Text className="text-white text-[18px] my-3">3. Consent</Text>
        <Text className="text-white font-extralight">
          Knowledge and consent are required for the collection, use or
          disclosure of Personal Information except where required or permitted
          by law. Providing us with your Personal Information is always your
          choice. However, your decision not to provide certain information may
          limit our ability to provide you with our products or services. We
          will not require you to consent to the collection, use, or disclosure
          of information as a condition to the supply of a product or service,
          except as required to be able to supply the product or service.
        </Text>
        <Text className="text-white text-[18px] my-3">
          4. Limiting Collection
        </Text>
        <Text className="text-white font-extralight">
          The Personal Information collected will be limited to those details
          necessary for the purposes identified by us. With your consent, we may
          collect Personal Information from you in person, over the telephone or
          by corresponding with you via mail, facsimile, or the Internet.
        </Text>
        <Text className="text-white text-[18px] my-3">
          5. Limiting Use, Disclosure and Retention
        </Text>
        <Text className="text-white font-extralight">
          Personal Information may only be used or disclosed for the purpose for
          which it was collected unless you have otherwise consented, or when it
          is required or permitted by law. Personal Information will only be
          retained for the period of time required to fulfill the purpose for
          which we collected it or as may be required by law.
        </Text>
        <Text className="text-white text-[18px] my-3">6. Accuracy</Text>
        <Text className="text-white font-extralight">
          Personal Information will be maintained in as accurate, complete and
          up-to-date form as is necessary to fulfill the purposes for which it
          is to be used.
        </Text>
        <Text className="text-white text-[18px] my-3">
          7. Safeguarding Customer Information
        </Text>
        <Text className="text-white font-extralight">
          Personal Information will be protected by security safeguards that are
          appropriate to the sensitivity level of the information. We take all
          reasonable precautions to protect your Personal Information from any
          loss or unauthorized use, access or disclosure.
        </Text>
        <Text className="text-white text-[18px] my-3">8. Openness</Text>
        <Text className="text-white font-extralight">
          We will make information available to you about our policies and
          practices with respect to the management of your Personal Information.
        </Text>
        <Text className="text-white text-[18px] my-3">9. Customer Access</Text>
        <Text className="text-white font-extralight">
          Upon request, you will be informed of the existence, use and
          disclosure of your Personal Information, and will be given access to
          it. You may verify the accuracy and completeness of your Personal
          Information, and may request that it be amended, if appropriate.
          However, in certain circumstances permitted by law, we will not
          disclose certain information to you. For example, we may not disclose
          information relating to you if other individuals are referenced or if
          there are legal, security or commercial proprietary restrictions.
        </Text>

        <Text className="text-white italic text-[18px] my-3">Cookies</Text>

        <Text className="text-white font-extralight">
          A cookie is a small computer file or piece of information that may be
          stored in your computer's hard drive when you visit our websites. We
          may use cookies to improve our website’s functionality and in some
          cases, to provide visitors with a customized online experience.
          Cookies are widely used and most web browsers are configured initially
          to accept cookies automatically. You may change your Internet browser
          settings to prevent your computer from accepting cookies or to notify
          you when you receive a cookie so that you may decline its acceptance.
          Please note, however, if you disable cookies, you may not experience
          optimal performance of our website.
        </Text>
        <Text className="text-white italic text-[18px] my-3">
          Other Websites
        </Text>

        <Text className="text-white font-extralight mb-5">
          Our website may contain links to other third party sites that are not
          governed by this privacy policy. Although we endeavour to only link to
          sites with high privacy standards, our privacy policy will no longer
          apply once you leave our website. Additionally, we are not responsible
          for the privacy practices employed by third party websites. Therefore,
          we suggest that you examine the privacy statements of those sites to
          learn how your information may be collected, used, shared and
          disclosed.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
