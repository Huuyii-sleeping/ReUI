import * as React from "react";
import Cookies from "js-cookie";

const useCookie = (
  cookieName: string,
): [
  string | null,
  (newValue: string, options?: Cookies.CookieAttributes) => void,
  () => void,
] => {
  const [value, setValue] = React.useState<string | null>(
    () => Cookies.get(cookieName) || null,
  );

  const updateCookie = React.useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options);
      setValue(newValue);
    },
    [cookieName],
  );

  const deleteCookie = React.useCallback(() => {
    Cookies.remove(cookieName);
    setValue(null);
  }, [cookieName]);

  return [value, updateCookie, deleteCookie];
};

export default useCookie;
