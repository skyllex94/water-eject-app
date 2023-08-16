import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

class AppPermissions {
  checkPermission = async () => {
    const permissions = PERMISSIONS.IOS.MICROPHONE;
    if (!permissions) return true;

    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) return true;
      return this.requestPermission(permissions);
    } catch (error) {
      return false;
    }
  };

  requestPermission = async (permission) => {
    try {
      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };
}

const Permissions = new AppPermissions();
export { Permissions };
