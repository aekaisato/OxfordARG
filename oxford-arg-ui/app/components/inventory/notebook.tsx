import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { ViewProperties } from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const allImages = [
  {
    original: require("../../../assets/notebook/notebook-01.png"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-1.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-02.png"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-2.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-03.png"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-3.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-04.png"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-4.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-05.png"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-5.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-06.png"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-6.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-07.png"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-7.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-08.png"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-8.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-09.png"),
    thumbnail: require("../../../assets/notebook/thumbnails/thumbnail-9.png"),
  },
  {
    original: require("../../../assets/notebook/notebook-10.png"),
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
