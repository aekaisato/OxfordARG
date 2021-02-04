import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  Image,
} from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const cipherText =
  "Iulhqgv, Urpdqv, Frxqwubphq, ohqg ph brxu hduv: Wklv whdfkhu'v jxlgh kdv ehhq wdnhq ryhu eb KRVKL™. Li brx'uh orrnlqj iru zkdw zh'yh fuhdwhg, wkh sdvvzrug wr wkh vdih lq wkh fdelqhw lv **HLJKW-WKUHH-ILYH-QLQH**. Li brx'uh qrw rq wkh txhvw, wkhq frpsohwhob ljqruh zkdw zh mxvw vdlg. Dqg li brx'uh iurp Zklwqhb, ohdyh. Wkdqn brx!";
const cT1 = cipherText.substring(0, cipherText.length / 2);
const cT2 = cipherText.substring(cipherText.length / 2);
//console.log(cipherText);

export class Puzzle4Book extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/backdrops/puzzle_4-1.jpg")}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={require("../../../assets/img/blank-book.png")}
            style={{
              height: "95%",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-evenly",
                height: "60%",
              }}
            >
              <Text
                style={{
                  width: "33%",
                  height: "80%",
                  fontFamily: "EB-Garamond",
                  fontSize: deviceHeight / 28,
                }}
              >
                {cT1}
              </Text>
              <Text
                style={{
                  width: "33%",
                  height: "80%",
                  fontFamily: "EB-Garamond",
                  fontSize: deviceHeight / 28,
                }}
              >
                {cT2.substring(0, cT2.indexOf("**"))}
                <Text style={{ fontWeight: "bold" }}>
                  {cT2.substring(
                    cT2.indexOf("**"),
                    cT2.indexOf("**") +
                      cT2.substring(cT2.indexOf("**") + 2).indexOf("**") +
                      4
                  )}
                </Text>
                {cT2.substring(
                  cT2.indexOf("**") +
                    cT2.substring(cT2.indexOf("**") + 2).indexOf("**") +
                    4
                )}
              </Text>
            </View>
            <Image
              source={require("../../../assets/img/caesar-cipher-guide.svg")}
              style={{ height: "15%" }}
              resizeMode="contain"
            />
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
