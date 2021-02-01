const transcriptStrings = {
  Scene1Line1: `Mr. Alonso: Ah, there you are! Thank you so much for helping me out with the ViriDOS project! The past few nights have been, uh, kinda busy as we scrambled to get this prototype ready, but now we are...somewhat confident in it. Let me show you how it works.`,
  Scene3Line1: `Mr. Alonso: That shouldn't happen. I swear I programmed it on a straight path. Could you take a look to see what's wrong?`,
  Scene4Line1: `Mr. Alonso: Hm, there seems to be an odd script in ViriDOS's files. Hm, hopefully that's just a one-off glitch here, let's continue the test.`,
  Scene6Line1: `Mr. Alonso: Huh, back here again huh? That's odd, there's some transmission sending data directly to the robot! Hm,no-one else should have access to control it... and why would they bring it in here...? Hm, anyway, why don't you go and fix the robot.`,
  Scene7Line1: `Mr. Alonso: Again? Another weird file showed up in ViriDOS. What is going on? Its programming looks good! Hopefully that's the last of any technical difficulties.`,
  Scene9Line1: `Mr. Alonso: Gosh darn robot, why won't you work!? There's gotta be something else wrong, I've checked the code 5 times now! Check the wall for anything odd...maybe there is some interference. Or what about those weird files from earlier?`,
  Scene9Line2: `Mr. Alonso: Wait! My connection's breaking up! What's going on?! I can't see!`,
  Scene10Line1: `HOSHI Representative: To whoever finds this...we cannot let Whitney uncover the findings to Project Emerald. We have scattered research throughout the school. If you are reading this, find the research, it is imperative in order to conquer the Whitney Wildcats. Don't worry, we will be there with you throughout your tour.`,
  Scene11Line1: `Mr. Alonso: Hello? Hello?? Ah finally I've got connection again. Mhm, I don't know what went wrong there haha you know technology these days, but it seems like I have things under control finally. So before the robot started glitching, we were going to the English building. Let's continue the tour there. Gosh darn robot, I've got a lot of work to do on the programming...`,
  Scene12Line2: `Ms. Fong: Hey, do you mind helping me with a quick problem I have?`,
  Scene13Line1: `Ms. Fong: Hey, welcome to my classroom! Good thing you stopped by; my notes for Julius Caesar were scrambled for some reason. Can you help me with this?`,
  Scene14Line1: `Ms. Fong: Thank you! Now I can continue with my lesson prep. Have a nice day!`,
  Scene14Line2: `HOSHI Representative: Good, I've seen you've found out how we did our clues. You will continue to see this throughout the day; it's all part of the plan. Just continue your tour.`,
  Scene15Line2: `Mr. Hernandez: Ah there you are! I heard you'd be on campus today. Do you mind helping me putting up these posters?`,
  Scene16Line1: `HOSHI Representative: Well done.`,
  Scene17Line1: `Ms. Worthington: Hey! Thought I'd catch you on campus testing the tour today. There's a paper on my desk that needs to be filled out. Do you mind doing it for me?`,
  Scene19Line1: `Tran: Hey guys, how's it going? I got this slip of paper this morning saying to look at my periodic table, but I don't know what it means. Do you think you can give it a shot?`,
  Scene19Line2: `HOSHI Representative: Nice work, that's four clues down. Keep going, hopefully Whitney hasn't caught on yet...`,
  Scene20Line1: `Mr. Alonso: Uh oh, what's goin-`,
  Scene20Line2: `HOSHI Representative: Look, something is wrong. We picked some strange signals fetching data from the robot. The IP address traces to Whitney. We think they're on your trail. It is _imperative_ that you find the pages and find them quick. Go to classroom 30B. And be careful. `,
  Scene20Error1: `HOSHI Representative: That's not quite right, try again`,
  Scene20Error2: `HOSHI Representative: Uhhh, that's now what I meant either`,
  Scene20Error3: `HOSHI Representative: Take a closer look at the clue I gave you. It's almost spelled out for you. We though you were the smart one...`,
  Scene21Line1: `Ms. Stephan: How's the tour been so far? I know you can't respond to that, but I just hope you're enjoying it. Huh, that's odd. The lights are out. Is everything okay there? Uh...anyway... Right now, we're in Mr. Kim's room, and did you know he has a stash of Choco Pies in that cabinet over there? It's too bad he put a lock on it...`,
  Scene21Line1P2: `Mr. Kim's Class Representative: Hi I'm Mr. Kim's class president. Someone came in and locked it up, leaving a strange note on the desk. Hey, since you're here, why don't you check it out?`,
  Scene21Line2: `Ms. Stephan: Wait, what's tha--`,
  Scene21Line2P2: `HOSHI Representative: Good, you found the page. ViriDOS will guide you to the next location.`,
  Scene22Line1: `Ms. Siggson: Oh, hey, glad you're here. When I heard there was a blackout I decided to check in on the classroom. For whatever reason, someone threw a safe into it. There's also a slip of paper, but I can't read it from my camera angle.`,
  Scene22Line2: `HOSHI Representative: We've almost stopped Whitney from getting into our system. It should be safe to say this now: go to the locker rooms.`,
  Scene23Line2: `Ms. Jensen: I thought I heard that tour robot, glad I caught you guys! The blackout must've done something funky; there are a bunch of posters that I haven't seen before! Maybe you guys can go check it out?`,
  Scene23Line3: `HOSHI Representative: Okay, I think Whitney has lost our trail. Head to the custodial building for your next page.`,
  Scene24Line1: `Mr. Vasquez: I thought you'd might want to take a look at this. All of my mops are all over the place for some reason!`,
  Scene24Line1P2: `HOSHI Representative: We've handled the mops, but there seems to issues with the lights now. Why don't you go check that out.`,
  Scene25Line1: `Whitney Representative: We know who you are and what you're after. You will not succeed. Whitney will reign number 1! Stop now...or else...By the way, we know where you are...`,
  Scene25Line2: `HOSHI Representative: Hurry! They're onto us! You must find the rest of the research before it's too late! I'm sorry, I can't help you anymore until you find the rest of the pages; this connection just isn't safe anymore. The fate of our rankings is in your hands. I'll leave you with one last hint.`,
  Scene25Error1: `HOSHI Representative: Uhh that's not quite right, look at your math again.`,
  Scene25Error2: `HOSHI Representative: Wrong one.`,
  Scene25Error3: `HOSHI Representative: C'mon now, you're an Oxford student. I'm pretty confident you can do basic math unless the curriculum has changed since I was last there...`,
  Scene25Line3: `HOSHI Representative: Shut up!`,
  Scene26Line1: `Mr. Hogan: Glad I ran into you. I just received this cryptic email from someone from Whitney? Do you know what's going on? You're free to use my piano if you feel like it.`,
  Scene26Line2: `Mr. Hogan: What an interesting tune. I hope everything will be alright; best of luck.`,
  Scene27Line1: `Mr. Wai: Ok, I was looking through the various pathway classrooms when all of the computers started glitching out. Only one of them works, but it's stuck on the same screen. It seems like it's an application to program something, but I'm not at the computer myself. Since your robot is on campus, can you see if you can figure it out?`,
  Scene27Line2: `Whitney Representative: You can't run from the Wildcats, we know where the last clue is. We've disabled your little toy's robots from forward drive. Good luck getting there now.`,
  Scene27Line3: `Whitney Representative: You're driving backwards!? Ughh!`,
  Scene28Error1: `HOSHI Representative: No time to visit that site, Whitney's closing in.`,
  Scene28Error2: `HOSHI Representative: We can go there another time, but not now`,
  Scene28Error3: `HOSHI Representative: Sigh, we may need to implement an orienteering class at Oxford`,
  Scene28Line1: `HOSHI Representative: Awesome, I"m so glad you were able to piece it all together. The secret is safe now, our engineers have blocked Whitney's connection.`,
  Scene30Line1: `HOSHI Representative: And there you have it, the glorious Green Polo, the results of Project Emerald. Our studies have shown that students who wear this polo are guaranteed to be the best Oxford student. You have clearly proven yourself worthy of the green polo through your efforts to thwart Whitney from getting possession of our coveted product. Thank you for everything, make us proud, go Patriots. HOSHI out`,
  Scene30Line2: `Mr. Alonso: There you are, finally my systems are back online! What on earth has ViriDOS gone through?? (sigh), I guess I've got a lot of re-programming to do. Thank you for your help again, can't imagine what this poor robot's been through...`,
}

export { transcriptStrings };