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
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { ViewProperties } from "react-native";
import {
  getLibrary,
  getStatus,
  setStatus,
} from "../status_system/status_system";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const allImages = [
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

let images: any = [];
export { images };

// export async function checkPages() {
//   let status = await getStatus();
//   if(status == null) {
//     return;
//   }
//   let statusVal = Number.parseInt(status);
//   let library = getLibrary();
//   for (let i = statusVal; i > 0; i--) {
//     if(library[i].page != undefined) {
//       let index = i;
//       for(let j = 0; j < index; j++) {
//         images.push(allImages[j])
//       }
//       return;
//     }
//   }
// }

let that: this;

export function setPage(page: number) {
  console.log("setting state?");
  if (page > images.length) {
    images = allImages.slice(0, page);
    that.forceUpdate();
  }
}

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export declare interface NotebookProps extends ViewProperties {}

export class Notebook extends React.Component<NotebookProps> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    that = this;
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ImageGallery
          items={images}
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
