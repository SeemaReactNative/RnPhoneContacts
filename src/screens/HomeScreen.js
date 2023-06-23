import React, { useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Linking,
  Platform,
  FlatList,
  PermissionsAndroid,
  I18nManager,
} from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, scale } from "react-native-size-matters";
import Contacts from "react-native-contacts";

import Contact from "../screens/Contact";
import SearchContact from "../screens/SearchContact";

const HomeScreen = (props) => {
  const { t } = useTranslation();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    if (Platform.OS === "android") {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: "Contacts",
            message: "This app would like to view your contacts.",
            buttonPositive: "Please accept bare mortal",
          }
        )
          .then((res) => {
            console.log("Permission: ", res);

            Contacts.getAll()
              .then((contacts) => {
                setContacts(contacts);
              })
              .catch((err) => {
                console.log("er ==>", err);
              });
          })
          .catch((error) => {
            console.error("Permission error: ", error);
          });
      } catch (err) {
        console.log("e=======>", err);
      }
    }
  };

  const searchFun = (text) => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === "" || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then((contacts) => {
        setContacts(contacts);
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text).then((contacts) => {
        setContacts(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then((contacts) => {
        setContacts(contacts);
      });
    }
  };

  const renderContact = ({ item, index }) => {
    return <Contact contact={item} />;
  };

  return (
    <>
      <View style={styles.connectionStatuStyles}>
        <Text style={{ alignSelf: "center" }}>Contact List</Text>
        <SearchContact
          searchPlaceholder={"Search contacts"}
          onChangeText={searchFun}
        />
        <FlatList
          data={contacts}
          renderItem={renderContact}
          style={{ flex: 1 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  connectionStatuStyles: {
    flex: 1,
    marginVertical: 8,
    padding: 5,
    paddingHorizontal: scale(20),
    marginTop: scale(20),
  },
  networkText: {
    fontSize: moderateScale(14),
    padding: 4,
    color: "white",
  },
});

export default HomeScreen;
