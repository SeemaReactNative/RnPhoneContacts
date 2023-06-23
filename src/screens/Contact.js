import { size } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { scale } from "react-native-size-matters";
const Contact = ({ contact }) => {
  const [selected, setSelected] = useState("");

  const onSelectContact = useCallback(
    (childIdValue, contactData) => {
      setSelected({ childId: childIdValue, contactId: contactData?.recordID });
    },
    [selected]
  );

  const checkPhoneNumber = useCallback(
    (phoneID, contactID) => {
      console.log("selected ==>", selected, phoneID, contactID);
      if (selected?.contactId === contactID && selected?.childId === phoneID) {
        return (
          <Image
            source={require("../assets/img/check.png")}
            style={{
              height: scale(15),
              width: scale(15),
              marginLeft: scale(30),
            }}
          />
        );
      } else {
        return <></>;
      }
    },
    [selected]
  );

  return (
    <View style={styles.contactCon}>
      <View style={styles.imgCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>{contact?.givenName[0]}</Text>
        </View>
      </View>
      <View style={styles.contactDat}>
        <Text style={styles.name}>
          {contact?.givenName} {contact?.middleName && contact.middleName + " "}
          {contact?.familyName}
        </Text>

        {size(contact?.phoneNumbers) > 0 &&
          contact?.phoneNumbers.map((phone, ind) => {
            return (
              <Pressable
                key={phone?.id}
                onPress={() => {
                  if (
                    selected?.contactId === contact?.recordID &&
                    selected?.childId === phone?.id
                  ) {
                    setSelected("");
                  } else {
                    onSelectContact(phone?.id, contact);
                  }
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.phoneNumber}>{phone?.number}</Text>
                {selected?.contactId === contact?.recordID &&
                selected?.childId === phone?.id ? (
                  <Image
                    source={require("../assets/img/check.png")}
                    style={{
                      height: scale(15),
                      width: scale(15),
                      marginLeft: scale(30),
                    }}
                  />
                ) : null}
                {/* {checkPhoneNumber(phone?.id, contact?.recordID)} */}
              </Pressable>
            );
          })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },
  contactDat: {
    paddingLeft: 5,
    borderColor: "#999",
  },
  txt: {
    fontSize: 18,
    color: "#000",
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: "#888",
    padding: 5,
  },
});
export default Contact;
