import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity, SafeAreaView } from "react-native";
import { bgColor } from "../../constants/ColorsUI";
import { Ionicons } from "@expo/vector-icons";

export default function TermsOfUse({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView className="p-4">
        <TouchableOpacity
          className={`bg-[${bgColor}] items-center justify-center h-11 w-11 rounded-xl`}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-[24px] mt-4 mb-5 text-white">
          Terms and Conditions
        </Text>
        <Text className="text-white font-extralight">
          Last updated: November 04, 2023
        </Text>
        <Text className="text-white font-extralight">
          Please read these terms and conditions carefully before using Our
          Service.
        </Text>
        <Text className="text-white text-[18px] my-3">
          Interpretation and Definitions
        </Text>
        <Text className="text-white font-extralight">Interpretation</Text>
        <Text className="text-white font-extralight">
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </Text>
        <Text className="text-white font-extralight">Definitions</Text>
        <Text className="text-white font-extralight">
          For the purposes of these Terms and Conditions:
        </Text>
        <Text className="text-white font-extralight">
          Application means the software program provided by the Company
          downloaded by You on any electronic device, named WaterDrop
        </Text>
        <Text className="text-white font-extralight">
          Application Store means the digital distribution service operated and
          developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play
          Store) in which the Application has been downloaded.
        </Text>
        <Text className="text-white font-extralight">
          Affiliate means an entity that controls, is controlled by or is under
          common control with a party, where &quot;control&quot; means ownership
          of 50% or more of the shares, equity interest or other securities
          entitled to vote for election of directors or other managing
          authority.
        </Text>
        <Text className="text-white font-extralight">
          Country refers to: Massachusetts, United States
        </Text>
        <Text className="text-white font-extralight">
          Company (referred to as either &quot;the Company&quot;,
          &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement)
          refers to Zion Studios LLC, 24 Captain Berties Way, Provincetown,
          02657.
        </Text>
        <Text className="text-white font-extralight">
          Device means any device that can access the Service such as a
          computer, a cellphone or a digital tablet.
        </Text>
        <Text className="text-white font-extralight">
          Service refers to the Application.
        </Text>
        <Text className="text-white font-extralight">
          Terms and Conditions (also referred as &quot;Terms&quot;) mean these
          Terms and Conditions that form the entire agreement between You and
          the Company regarding the use of the Service. This Terms and
          Conditions agreement has been created with the help of the
        </Text>
        <Text className="text-white font-extralight">
          Third-party Social Media Service means any services or content
          (including data, information, products or services) provided by a
          third-party that may be displayed, included or made available by the
          Service.
        </Text>
        <Text className="text-white font-extralight">
          You means the individual accessing or using the Service, or the
          company, or other legal entity on behalf of which such individual is
          accessing or using the Service, as applicable.
        </Text>
        <Text className="text-white text-[18px] my-3">Acknowledgment</Text>
        <Text className="text-white font-extralight">
          These are the Terms and Conditions governing the use of this Service
          and the agreement that operates between You and the Company. These
          Terms and Conditions set out the rights and obligations of all users
          regarding the use of the Service.
        </Text>
        <Text className="text-white font-extralight">
          Your access to and use of the Service is conditioned on Your
          acceptance of and compliance with these Terms and Conditions. These
          Terms and Conditions apply to all visitors, users and others who
          access or use the Service.
        </Text>
        <Text className="text-white font-extralight">
          By accessing or using the Service You agree to be bound by these Terms
          and Conditions. If You disagree with any part of these Terms and
          Conditions then You may not access the Service.
        </Text>
        <Text className="text-white font-extralight">
          You represent that you are over the age of 18px. The Company does not
          permit those under 18px to use the Service.
        </Text>
        <Text className="text-white font-extralight">
          Your access to and use of the Service is also conditioned on Your
          acceptance of and compliance with the Privacy Policy of the Company.
          Our Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your personal information when You
          use the Application or the Website and tells You about Your privacy
          rights and how the law protects You. Please read Our Privacy Policy
          carefully before using Our Service.
        </Text>
        <Text className="text-white text-[18px] my-3">
          Payment Subscriptions
        </Text>

        <Text className="text-white font-extralight">
          The available options for subscription to the WaterDrop App are as
          follows:
        </Text>
        <Text className="text-white font-extralight my-2">
          Weekly Subscription: A $2.99 or then-current amount purchase will be
          applied to your iTunes account on confirmation. Subscriptions will
          automatically renew unless canceled within 24-hours before the end of
          the current period. You can cancel anytime with your iTunes account
          settings. Any unused portion of a free trial will be forfeited if you
          purchase a subscription. Subscriptions may be managed by the user and
          auto-renewal may be turned off by going to the user’s Account Settings
          after purchase.
        </Text>
        <Text className="text-white font-extralight my-2">
          Monthly Subscription: A $14.99 or then-current amount purchase will be
          applied to your iTunes account on confirmation. Subscriptions will
          automatically renew unless canceled within 24-hours before the end of
          the current period. You can cancel anytime with your iTunes account
          settings. Any unused portion of a free trial will be forfeited if you
          purchase a subscription. Subscriptions may be managed by the user and
          auto-renewal may be turned off by going to the user’s Account Settings
          after purchase.
        </Text>
        <Text className="text-white text-[18px] my-3">
          Links to Other Websites
        </Text>
        <Text className="text-white font-extralight">
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by the Company.
        </Text>
        <Text className="text-white font-extralight">
          The Company has no control over, and assumes no responsibility for,
          the content, privacy policies, or practices of any third party web
          sites or services. You further acknowledge and agree that the Company
          shall not be responsible or liable, directly or indirectly, for any
          damage or loss caused or alleged to be caused by or in connection with
          the use of or reliance on any such content, goods or services
          available on or through any such web sites or services.
        </Text>
        <Text className="text-white font-extralight">
          We strongly advise You to read the terms and conditions and privacy
          policies of any third-party web sites or services that You visit.
        </Text>
        <Text className="text-white text-[18px] my-3">Termination</Text>
        <Text className="text-white font-extralight">
          We may terminate or suspend Your access immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if You breach these Terms and Conditions.
        </Text>
        <Text className="text-white font-extralight">
          Upon termination, Your right to use the Service will cease
          immediately.
        </Text>
        <Text className="text-white text-[18px] my-3">
          Limitation of Liability
        </Text>
        <Text className="text-white font-extralight">
          Notwithstanding any damages that You might incur, the entire liability
          of the Company and any of its suppliers under any provision of this
          Terms and Your exclusive remedy for all of the foregoing shall be
          limited to the amount actually paid by You through the Service or 100
          USD if You haven't purchased anything through the Service.
        </Text>
        <Text className="text-white font-extralight">
          To the maximum extent permitted by applicable law, in no event shall
          the Company or its suppliers be liable for any special, incidental,
          indirect, or consequential damages whatsoever (including, but not
          limited to, damages for loss of profits, loss of data or other
          information, for business interruption, for personal injury, loss of
          privacy arising out of or in any way related to the use of or
          inability to use the Service, third-party software and/or third-party
          hardware used with the Service, or otherwise in connection with any
          provision of this Terms), even if the Company or any supplier has been
          advised of the possibility of such damages and even if the remedy
          fails of its essential purpose.
        </Text>
        <Text className="text-white font-extralight">
          Some states do not allow the exclusion of implied warranties or
          limitation of liability for incidental or consequential damages, which
          means that some of the above limitations may not apply. In these
          states, each party's liability will be limited to the greatest extent
          permitted by law.
        </Text>

        <Text className="text-white text-[18px] my-3">
          &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
        </Text>
        <Text className="text-white font-extralight">
          The Service is provided to You &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; and with all faults and defects without warranty of
          any kind. To the maximum extent permitted under applicable law, the
          Company, on its own behalf and on behalf of its Affiliates and its and
          their respective licensors and service providers, expressly disclaims
          all warranties, whether express, implied, statutory or otherwise, with
          respect to the Service, including all implied warranties of
          merchantability, fitness for a particular purpose, title and
          non-infringement, and warranties that may arise out of course of
          dealing, course of performance, usage or trade practice. Without
          limitation to the foregoing, the Company provides no warranty or
          undertaking, and makes no representation of any kind that the Service
          will meet Your requirements, achieve any intended results, be
          compatible or work with any other software, applications, systems or
          services, operate without interruption, meet any performance or
          reliability standards or be error free or that any errors or defects
          can or will be corrected.
        </Text>
        <Text className="text-white font-extralight">
          Without limiting the foregoing, neither the Company nor any of the
          company's provider makes any representation or warranty of any kind,
          express or implied: (i) as to the operation or availability of the
          Service, or the information, content, and materials or products
          included thereon; (ii) that the Service will be uninterrupted or
          error-free; (iii) as to the accuracy, reliability, or currency of any
          information or content provided through the Service; or (iv) that the
          Service, its servers, the content, or e-mails sent from or on behalf
          of the Company are free of viruses, scripts, trojan horses, worms,
          malware, timebombs or other harmful components.
        </Text>
        <Text className="text-white font-extralight">
          Some jurisdictions do not allow the exclusion of certain types of
          warranties or limitations on applicable statutory rights of a
          consumer, so some or all of the above exclusions and limitations may
          not apply to You. But in such a case the exclusions and limitations
          set forth in this section shall be applied to the greatest extent
          enforceable under applicable law.
        </Text>
        <Text className="text-white text-[18px] my-3">Governing Law</Text>
        <Text className="text-white font-extralight">
          The laws of the Country, excluding its conflicts of law rules, shall
          govern this Terms and Your use of the Service. Your use of the
          Application may also be subject to other local, state, national, or
          international laws.
        </Text>
        <Text className="text-white font-extralight">Disputes Resolution</Text>
        <Text className="text-white font-extralight">
          If You have any concern or dispute about the Service, You agree to
          first try to resolve the dispute informally by contacting the Company.
        </Text>
        <Text className="text-white text-[18px] my-3">
          For European Union (EU) Users
        </Text>
        <Text className="text-white font-extralight">
          If You are a European Union consumer, you will benefit from any
          mandatory provisions of the law of the country in which you are
          resident in.
        </Text>
        <Text className="text-white text-[18px] my-3">
          United States Legal Compliance
        </Text>
        <Text className="text-white font-extralight">
          You represent and warrant that (i) You are not located in a country
          that is subject to the United States government embargo, or that has
          been designated by the United States government as a &quot;terrorist
          supporting&quot; country, and (ii) You are not listed on any United
          States government list of prohibited or restricted parties.
        </Text>
        <Text className="text-white text-[18px] my-3">
          Severability and Waiver
        </Text>
        <Text className="text-white font-extralight">Severability</Text>
        <Text className="text-white font-extralight">
          If any provision of these Terms is held to be unenforceable or
          invalid, such provision will be changed and interpreted to accomplish
          the objectives of such provision to the greatest extent possible under
          applicable law and the remaining provisions will continue in full
          force and effect.
        </Text>
        <Text className="text-white font-extralight">Waiver</Text>
        <Text className="text-white font-extralight">
          Except as provided herein, the failure to exercise a right or to
          require performance of an obligation under these Terms shall not
          effect a party's ability to exercise such right or require such
          performance at any time thereafter nor shall the waiver of a breach
          constitute a waiver of any subsequent breach.
        </Text>
        <Text className="text-white text-[18px] my-3">
          Translation Interpretation
        </Text>
        <Text className="text-white font-extralight">
          These Terms and Conditions may have been translated if We have made
          them available to You on our Service. You agree that the original
          English text shall prevail in the case of a dispute.
        </Text>
        <Text className="text-white text-[18px] my-3">
          Changes to These Terms and Conditions
        </Text>
        <Text className="text-white font-extralight">
          We reserve the right, at Our sole discretion, to modify or replace
          these Terms at any time. If a revision is material We will make
          reasonable efforts to provide at least 30 days' notice prior to any
          new terms taking effect. What constitutes a material change will be
          determined at Our sole discretion.
        </Text>
        <Text className="text-white font-extralight">
          By continuing to access or use Our Service after those revisions
          become effective, You agree to be bound by the revised terms. If You
          do not agree to the new terms, in whole or in part, please stop using
          the website and the Service.
        </Text>
        <Text className="text-white text-[18px] my-3">Contact Us</Text>
        <Text className="text-white font-extralight">
          If you have any questions about these Terms and Conditions, You can
          contact us:
        </Text>
        <Text className="text-white font-extralight mb-5">
          {" "}
          By email: zionstudiosapps@gmail.com
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
