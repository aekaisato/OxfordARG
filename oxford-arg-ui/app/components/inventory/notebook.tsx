import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  createAppContainer,
  SafeAreaView,
  ThemeContext,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { ViewProperties } from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let allImages = [
  {
    original: require("../../../assets/notebook/notebook-01.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-1.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-02.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-2.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-03.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-3.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-04.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-4.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-05.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-5.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-06.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-6.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-07.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-7.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-08.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-8.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-09.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-9.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-10.jpg"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-10.png"),
  },
];

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export declare interface NotebookProps extends ViewProperties {}

export class Notebook extends React.Component<NotebookProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ImageGallery
          items={allImages}
          showPlayButton={false}
          showFullscreenButton={false}
        />
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
