import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
  Text,
  Image,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { format, parseISO } from "date-fns";
import { NavigationEvents } from "react-navigation";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

let that: any;

document.addEventListener("contextmenu", (event) => event.preventDefault()); // prevents right click. remove maybe?

// https://codepen.io/ConnorsFan/pen/rzeXNe

let fps = 60;
let speedFactor = 0.0025;
let minDelta = 0.5;
let autoScrollSpeed = 10;
let autoScrollTimer: NodeJS.Timeout, restartTimer: NodeJS.Timeout;
let isScrolling = false;
let prevPos = 0,
  currentPos: number | undefined = 0;
let currentTime, prevTime: number | null, timeDiff;

async function initAutoScrollCredits() {
  while (document.getElementById("creditsView") == null) {
    await wait(1000);
  }
  document
    .getElementById("creditsView")
    ?.addEventListener("scroll", function (e) {
      currentPos = document.getElementById("creditsView")?.scrollTop;
    });
  document
    .getElementById("creditsView")
    ?.addEventListener("wheel", handleManualScroll);
  document
    .getElementById("creditsView")
    ?.addEventListener("touchmove", handleManualScroll);
  setAutoScroll(20);
}

function handleManualScroll() {
  currentPos = document.getElementById("creditsView")?.scrollTop;
  clearInterval(autoScrollTimer);
  if (restartTimer) {
    clearTimeout(restartTimer);
  }
  restartTimer = setTimeout(() => {
    prevTime = null;
    setAutoScroll();
  }, 250);
}

function setAutoScroll(newValue?: number | undefined) {
  if (newValue) {
    autoScrollSpeed = speedFactor * newValue;
  }
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer);
  }
  autoScrollTimer = setInterval(function () {
    currentTime = Date.now();
    if (prevTime) {
      if (!isScrolling) {
        timeDiff = currentTime - prevTime;
        currentPos += autoScrollSpeed * timeDiff;
        if (Math.abs(currentPos - prevPos) >= minDelta) {
          isScrolling = true;
          document.getElementById("creditsView")?.scrollTo(0, currentPos);
          isScrolling = false;
          prevPos = currentPos;
          prevTime = currentTime;
        }
      }
    } else {
      prevTime = currentTime;
    }
  }, 1000 / fps);
}

function setCreditsScrollToTop() {
  prevPos = 0;
  currentPos = 0;
  document.getElementById("creditsView")?.scrollTo(0, 0);
}

export async function updateCompletionData(completionData: any) {
  while (that == undefined) {
    await wait(2000);
  }
  console.log("completion screen that IS defined :)");
  let filteredData = {};
  for (let i in completionData) {
    if (completionData[i].completed != undefined) {
      filteredData = { ...filteredData, [i]: completionData[i] };
      console.log(filteredData);
    }
  }
  that.updateCompletionData(filteredData);
}

export class CompletionScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      loopAnim: new Animated.Value(0),
      completionData: {},
    };
    that = this;
  }

  move = () => {
    Animated.loop(
      Animated.timing(this.state.loopAnim, {
        toValue: (128 * (deviceWidth * 1.75)) / 3840,
        duration: 2500,
        easing: Easing.inOut(Easing.linear),
      })
    ).start();
  };

  componentDidMount() {
    this.move();
    initAutoScrollCredits();
  }

  updateCompletionData(completionData: any) {
    this.setState({ completionData });
  }

  compareDate(a: string, b: string) {
    let aStr = this.state.completionData[a].completed;
    let bStr = this.state.completionData[b].completed;
    if (aStr > bStr) {
      return 1;
    } else if (aStr < bStr) {
      return -1;
    } else {
      return 0;
    }
  }

  handleTopBorder(index: number) {
    if (index == 0) {
      return 1;
    } else {
      return 0;
    }
  }

  handleFontFamily(item: string) {
    let user = firebase.auth().currentUser;
    if (user == null) {
      return "Metropolis-Medium";
    } else if (user.uid == item) {
      return "Metropolis-Bold";
    } else {
      return "Metropolis-Medium";
    }
  }

  async handleName(item: string) {
    let database = firebase.database().ref("/users/" + item + "/name");
    let value = await (await database.once("value")).val();
    console.log(value);
    this.setState({ [item]: value });
  }

  handleNameMeta(item: string) {
    if (this.state[item] == undefined) {
      this.handleName(item);
    }
    return this.state[item];
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => setCreditsScrollToTop()} />
        <ImageBackground
          source={require("../layouts/phase1_layout/gradient only.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <ImageBackground
            source={require("../layouts/phase1_layout/grid only 2.png")}
            style={styles.imageBackgroundGrid}
            resizeMode="cover"
          >
            <Animated.View
              style={{ position: "absolute", right: this.state.loopAnim }}
            >
              <ImageBackground
                source={require("../layouts/phase1_layout/grid only 1.png")}
                style={styles.imageBackgroundGrid}
                resizeMode="cover"
              ></ImageBackground>
            </Animated.View>
          </ImageBackground>
        </ImageBackground>
        <View
          style={{
            height: deviceHeight,
            width: deviceWidth,
            flexDirection: "row",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: deviceHeight,
              width: (2 * deviceWidth) / 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#00000080",
                borderRadius: 36,
                height: (5 * deviceHeight) / 6,
                minWidth: (1 * deviceWidth) / 2,
                maxWidth: (2 * deviceWidth) / 3 - 40,
              }}
            >
              <Text
                style={{
                  color: "white",
                  margin: 20,
                  fontFamily: "Metropolis-Bold",
                  fontSize: deviceHeight / 20,
                }}
              >
                Leaderboard
              </Text>
              <ScrollView
                style={{ height: "100%", width: "100%" }}
                contentContainerStyle={{
                  height: "100%",
                  width: "100%",
                  marginHorizontal: 20,
                }}
              >
                {Object.keys(this.state.completionData)
                  .sort((a, b) => this.compareDate(a, b))
                  .map((item, index) => {
                    return (
                      <View
                        style={{
                          width: "95%",
                          flexDirection: "row",
                          height: deviceHeight / 20,
                          borderColor: "#FFFFFFA0",
                          borderTopWidth: this.handleTopBorder(index),
                          borderBottomWidth: 1,
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: this.handleFontFamily(item),
                              fontSize: deviceHeight / 48,
                              color: "white",
                            }}
                          >
                            {index + 1}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 7,
                            height: "100%",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: this.handleFontFamily(item),
                              fontSize: deviceHeight / 48,
                              color: "white",
                              margin: deviceWidth / 100,
                            }}
                          >
                            {this.handleNameMeta(item)}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 4,
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            overflow: "hidden",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: this.handleFontFamily(item),
                              fontSize: deviceHeight / 48,
                              color: "white",
                              margin: deviceWidth / 100,
                            }}
                          >
                            {format(
                              parseISO(
                                this.state.completionData[item].completed
                              ),
                              "p, PP"
                            )}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#00000080",
              height: deviceHeight,
              width: (1 * deviceWidth) / 3,
              overflow: "hidden"
            }}
          >
            <Text
              style={{
                color: "white",
                margin: 20,
                fontFamily: "Metropolis-Bold",
                fontSize: deviceHeight / 24,
              }}
            >
              Credits
            </Text>
            <div
              style={{
                height: "100%",
                width: "100%",
                overflowY: "scroll",
                alignItems: "center",
                textAlign: "center",
                paddingRight: (document.getElementById("creditsView")?.offsetWidth - document.getElementById("creditsView")?.offsetWidth) || 17,
                boxSizing: "content-box"
              }}
              id="creditsView"
            >
              <View style={{ height: deviceHeight }} />
              <Text
                style={{
                  color: "white",
                  margin: 20,
                  fontFamily: "Metropolis-Regular",
                  fontSize: deviceHeight / 54,
                  textAlign: "center",
                }}
              >
                {creditsString}
              </Text>
              <View style={{ height: deviceHeight / 2 }} />
              <Text
                style={{
                  color: "white",
                  margin: 20,
                  fontFamily: "Metropolis-Regular",
                  fontSize: deviceHeight / 54,
                  textAlign: "center",
                }}
              >
                Thanks for playing!
              </Text>
              <View style={{ height: deviceHeight / 2 }} />
            </div>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    overflow: "hidden",
  },
  imageBackground: {
    height: deviceHeight,
    width: deviceWidth,
  },
  imageBackgroundGrid: {
    height: deviceHeight * 1.75,
    width: deviceWidth * 1.75,
  },
});

const creditsString = `
PYTHON (MONTY) PICTURES LTD
in association with
MICHAEL WHITE
presents







Monty Python
and
The Holy Grail



Mønti Pythøn ik den Hølie Gräilen









Written and performed by:
Graham Chapman
John Cleese
Eric Idle
Terry Gilliam
Terry Jones
Michael Palin





Røten nik Akten Di













With
Connie Booth
Carol Cleveland
Neil Innes
Bee Duffell
John Young
Rita Davies





Wik















Also appearing
Avril Stewart
Sally Kinghon







Alsø wik










Also also appearing
     Mark Zycon     Elspeth Cameron
Mitsuko Forstater     Sandy Johnson    
    Sandy Rose     Romilly Squire
   Joni Flynn     Alison Walker
Loraine Ward     Anna Lanski 
      Sally Coombe     Vivienne Macdonald
   Yvonne Dick     Daphne Darling
 Fiona Gordon     Gloria Graham
    Judy Lams     Tracy Sneddon
Sylvia Taylor     Joyce Pollner
Mary Allen



Alsø alsø wik












Camera Operator     HOWARD ATHERTON
Camera Focus     JOHN WELLARD
Camera Assistant     ROGER PRATT     
Camera Grip     RAY HALL   
Chargehand Electrician     TERRY HUNT            
                     Lighting     TELEFILM LIGHTING SERVICE LTD
                             ANDREW RITCHIE & SON LTD
                TECHNICOLOR
Rostrum Cameraman     KENT HOUSTON     
 



Wi nøt trei a høliday in Sweden this yër ?











Sound Recordist     GARTH MARSHALL 
Sound Mixer     HUGH STRAIN
 Boom Swinger     GODFREY KIRBY
Sound Maintenance     PHILIP CHUBB     
Sound Assistant     ROBERT DOYLE   
Dubbing Editor     JOHN FOSTER   
        Assistant Editors     JOHN MISTER, NICK GASTER,
                              ALEXANDER CAMPBELL ASKEW,
                                    BRIAN PEACHEY, DANIELLE KOCHAVI
Sound Effects     IAN CRAFFORD 
  



See the løveli lakes












 Continuity     PENNY EYLES
     Accountant     BRIAN BROCKWELL
Production Secretary     CHRISTINE WATT      
  Property Buyer     BRIAN WINTERBORN
Property Master     TOM RAEBURN    
                Property Men     ROY CANNON, CHARLIE TORBETT,
                 MIKE KENNEDY
        Catering     RON HELLARD LTD.
             Vehicles     BUDGET RENT-A-CAR LTD




The wøndërful telephøne system













Assistant Art Director     PHILIP COWLAM         
Construction Manager     BILL HARMAN         
             Carpenters     NOBBY CLARK, BOB DEVINE
        Painter     GRAHAM BULLOCK 
    Stagehand     JIM N. SAVERY
     Rigger     ED SULLIVAN






And mäni interesting furry animals







                              With special extra thanks to
Charlie Knode, Brian McNulty, John Gledhill, Peter Thomson, Sue Cable,
Valerie Charlton, Drew Mara, Sue Smith, Charlie Coulter, Iain Monaghan,
Steve Bennell, Bernard Belenger, Alpini McAlpine, Hugh Boyle, Dave Taylor,
Gary Cooper, Peter Saunders, Les Shepherd, Vaughn Millard, Hamish MacInnes,
Terry Mosaic, Bawn O'Beirne Ranelagh.

Made entirely on location in Scotland at Doune Castle, Castle Stalker, Killin, Glen Coe,
Arnhall Castle, Bracklim Falls, Sherriffmuir.

By Python (Monty) Pictures Limited, 20, Fitzroy Square, London W1 England.
And completed at Twickenham Film Studios, England.
Copyright (c) 1974 National Film Trustee Company Limited.
All rights reserved.



The Producers would like to thank the Forestry Commission,
Doune Admissions Ltd, Keir & Cawdor Estates, Stirling University,
and the people of Doune for their help in the making of this film.

The Characters and incidents portrayed and the names used are fictitious and
any similarity to the names, characters, or history of any person is entirely
accidental and unintentional.
                       Signed RICHARD M. NIXON



Including the majestik møøse














Songs
NEIL INNES

Additional music
DEWOLFE






A Møøse once bit my sister...















Costume Designer
HAZEL PETHIG





  No realli! She was Karving her initials øn the møøse with the sharpened end  
  of an interspace tøøthbrush given her by Svenge - her brother-in-law -an Oslo
  dentist and star of many Norwegian møvies: "The Høt Hands of an Oslo         
  Dentist", "Fillings of Passion", "The Huge Mølars of Horst Nordfink"...      















We apologise for the fault in the
subtitles. Those responsible have been
sacked.








Mynd you, møøse bites Kan be pretty nasti...














We apologise again for the fault in the
subtitles. Those responsible for sacking
the people who have just been sacked,
have been sacked.



















Production Manager     JULIAN DOYLE      
Assistant Director     GERRY HARRISON    
Special Effects     JOHN HORTON    
 Choreography     LEO KHARIBIAN
Fight Director & Period Consultant     JOHN WALLER                       
         Make Up Artists     PEARL RASHBASS, PAM LUKE
Special Effects Photography     JULIAN DOYLE               
        Animation Assistance     LUCINDA COWELL, KATE HEPBURN
             Møøse Trained by     YUTTE HERMSGERVØRDENBRØTBØRDA




















Lighting Cameraman     TERRY BEDFORD     
Special Møøse Effects     OLAF PROT            
 Møøse Costumes     SIGGI CHURCHILL






















 Designer     ROY SMITH
Møøse choreographed by     HORST PROT III        
Miss Taylor's Møøses by     HENGST DOUGLAS-HOME    
     Møøse trained to mix concrete and                                           
sign complicated insurance forms by     JURGEN WIGG                        



















      Editor     JOHN HACKNEY
       Møøses noses wiped by     BJØRN IRKESTØM-SLATER WALKER
 Large møøse on the left hand side                                       
of the screen in the third scene from the                                              
end, given a thorough grounding in Latin,                                              
French and "O" Level Geography by     BO BENN                          
Suggestive poses for the møøse                                   

suggested by     VIC ROTTER  
Antler-care by     LIV THATCHER  

















     The directors of the firm hired to     
     continue the credits after the other   
     people had been sacked, wish it to     
     be known that they have just been      
     sacked.                                

     The credits have been completed        
     in an entirely different style at great
     expense and at the last minute.        




















Executive Producer
JOHN GOLDSTONE & "RALPH" The Wonder Llama





















Producer
MARK FORSTATER

Assisted By
EARL J. LLAMA
MILT Q. LLAMA III
SY LLAMA
MERLE Z. LLAMA IX














Directed By

40 SPECIALLY TRAINED
ECUADORIAN MOUNTAIN LLAMAS

6 VENEZUELAN RED LLAMAS

142 MEXICAN WHOOPING LLAMAS

14 NORTH CHILEAN GUANACOS
(CLOSELY RELATED TO THE LLAMA)

REG LLAMA OF BRIXTON

76000 BATTERY LLAMAS
FROM "LLAMA-FRESH" FARMS LTD. NEAR PARAGUAY

and

TERRY GILLIAM & TERRY JONES


`;
