import { min } from "date-fns";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Platform } from "react-native";

export const downloadFromUrl = async (url, fileName) => {
  const result = await FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + fileName
  );

  const uri = await save(result.uri, fileName, result.headers["Content-Type"]);
  return uri;
};
export const downloadFromAPI = async (url, fileName) => {
  const result = await FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + fileName,
    {
      headers: {
        MyHeader: "MyValue",
      },
    }
  );

  const uri = save(result.uri, fileName, result.headers["Content-Type"]);

  return uri;
};

export const save = async (uri, filename, mimetype) => {
  if (Platform.OS === "android") {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        mimetype
      ).then(async (selectedUri) => {
        await FileSystem.writeAsStringAsync(selectedUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return selectedUri;
      });
    } else {
      shareAsync(uri);
    }
  } else {
    shareAsync(uri);
  }
};
