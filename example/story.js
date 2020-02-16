sadako.story = {"init":{"0":[{"t":"Welcome.\r"},{"t":"enter_name\r","k":"=","l":"init.enter_name"},{"t":"Please tell me your name.\r"},{"t":"<table><>\r"},{"t":"<tr><>\r"},{"t":"<td>[:> $.name @: <b>First</b>^^:]</td><>\r"},{"t":"<td>[:> $.lname @: <b>Last</b>^^:]</td><>\r"},{"t":"</tr><>\r"},{"t":"</table>\r"},{"t":"[:>> $.bleh @: <b>Favorite Foods</b> (not needed)^^:]\r"},{"t":"[Continue]\r","k":"\\+"},{"t":"[:& $.demo_complete = false:]\r","k":"\\-"},{"t":"It's a pleasant rainy day outside. You're spending it indoors with your sister Erin.\r"},{"t":">> #living_room\r"}],"0.10":[{"t":"if (!$.name || !$.lname)\r","k":"~"},{"t":"[:& $.fname = \"$:name $:lname\":]\r","k":"\\-"},{"t":"Your name is $:fname. Is this correct?\r"},{"t":"[Yes]\r","k":"\\+","l":"init.y"},{"t":"[No]\r","k":"\\+"}],"0.10.0":[{"t":"Name is invalid.\r"},{"t":">> enter_name\r"}],"0.10.4":[{"t":">> enter_name\r"}]},"inventory":{"0":[{"t":"[:= game.displayInventory():]\r"}]},"living_room":{"0":[{"t":"(:title \"Living Room\":) \r"},{"t":"<b><i>You've reached the end of the demo! Thanks for playing!</i></b> :: $.demo_complete\r"},{"t":"Your family isn't rich but they provide well enough, as is visible by this room. It comes with your usual furnishings like a [:% couch:] and a [:% television:]. In the middle of the room is a large circular [:% rug @: throw rug:]. The wall to the right of the couch houses a set of [:% windows:] overlooking the yard.\r"},{"t":"[:erin @: Erin:] is here, seated comfortably on the throw rug and watching the TV.\t\r"},{"t":"<< END\r"},{"t":"television\r","k":"=","l":"living_room.television"},{"t":"The TV is playing {:%.erin.talked::Erin's favorite show::some sort of anime:}. \r"},{"t":"Voices coming from the TV: <:demo-tv::\"I was in an accident. I have amnesia!\":>\r"},{"t":"It seems like {:%.erin.talked::the relationship between Junji and Miren is getting deeper and::a very tropey show, but:} Erin looks like she's really invested in it.\r"},{"t":"[Back]\r","k":"\\+","l":"living_room.tv_back"},{"t":"erin_watching\r","k":"=","l":"living_room.erin_watching"},{"t":"if (*.waiting_for_remote.hasEnded)\r","k":"~"},{"t":"","k":"\\-"},{"t":"<<\r"},{"t":"couch\r","k":"=","l":"living_room.couch"},{"t":"The couch isn't anything special, but it's very comfortable and faces TV at the perfect angle. Erin still prefers the floor, for whatever reason.\r"},{"t":"if (%.living_room.searched_couch)\r","k":"~"},{"t":"else if (*.waiting_for_remote.isActive)\r","k":"~"},{"t":"[Back]\r","k":"\\+","l":"living_room.couch_back"},{"t":"rug\r","k":"=","l":"living_room.rug"},{"t":"It's a large colorful rug. You have no idea what material it's made of, but it's very soft to the touch and it feels like you sink into it.\r"},{"t":"Erin is currently appreciating its comfort.\r"},{"t":">> go_back\r"},{"t":"windows\r","k":"=","l":"living_room.windows"},{"t":"The rain gently taps against the window pane. There's a light mist covering the yard.\r"},{"t":"A bolt lightning lights up the sky. ~:delay:2000\r"},{"t":"A soft crackle of thunder can be heard moments later. ~:delay:3000\r"},{"t":"The rain begins to pound the window harder.\r"},{"t":"~:delay:0\r","k":"\\-"},{"t":"go_back\r","k":"=","l":"living_room.go_back"},{"t":"[Back]","k":"\\+","l":"living_room.gb"}],"0.9":[{"t":"<< RETURN\r"}],"0.11":[{"t":"Erin is completely absorbed in her show and it doesn't look like she wants to be disturbed any further.\r"},{"t":">> go_back\r"}],"0.16":[{"t":"You're pretty positive there's nothing else in the couch.\r"}],"0.17":[{"t":"There's really only one place you can think of where the remote would be: in the black hole that is the space between the couch cushions.\r"},{"t":"[Search couch]\r","k":"\\+","l":"living_room.searched_couch"},{"t":"[Back]\r","k":"\\+","l":"living_room.search_back"}],"0.17.1":[{"t":"(:move \"items\", \"remote\":) \r"},{"t":"You stick your hand between the cushions and reach deeper into the couch than you think should be possible, but eventually your hand rests upon what you imagine is the remote. You retrieve it and blow off the dust.\r"},{"t":">> go_back\r"}],"0.17.2":[{"t":">> $:bookmark\r"}],"0.18":[{"t":"<< RETURN\r"}],"0.30":[{"t":"<< RETURN\r"}]},"erin":{"0":[{"t":">> living_room.erin_watching\r"},{"t":">> remote :: *.waiting_for_remote.isActive\r","k":"\\-"},{"t":"Erin looks up at you. \"Hey, $:name.\"\r"},{"t":"\"Hey, Erin.\"\r","k":"\\+"},{"t":"\"What you are watching?\"\r","k":"\\+"},{"t":"","k":"\\-"},{"t":"[Sit with Erin]\r","k":"\\+"},{"t":"\"No thanks. Maybe later.\"\r","k":"\\+"},{"t":"remote\r","k":"=","l":"erin.remote"},{"t":"(:bookmark \"remote\":)\r"},{"t":"\"Hey. Did you get the remote yet?\"\r"},{"t":"go_back\r","k":"=","l":"erin.go_back"},{"t":"[Back]","k":"\\+","l":"erin.gb"}],"0.3":[{"t":"She pats a spot on the rug next to her. \"Come sit with me.\"\r"}],"0.4":[{"t":"\"It's my show. It's starting to get really good, but it's commercials right now. Want to watch it with me?\"\r"}],"0.6":[{"t":"You plop yourself down next to her.\r"},{"t":"\"Nice.\" She smiles at you. \"I think you'll really enjoy this.\"\r"},{"t":"\"What is this show even about?\"[] you ask.\r","k":"\\+"},{"t":"\"I think you told me about this one before.[\"] It's the one with the two mech pilots from warring nations that fall in love, right?\"\r","k":"\\+"},{"t":"<> She sighs. \"Junji is just so dreamy.\"\r","k":"\\-"},{"t":"guess\r","k":"=","l":"erin.guess"},{"t":"\"Is he the one with the eyepatch?\"\r","k":"\\*","l":"erin.g1"},{"t":"\"Does he have the shaved head?\"\r","k":"\\*","l":"erin.g2"},{"t":"\"Is he the one that wears the biker jacket?\"\r","k":"\\*","l":"erin.g3"},{"t":"","k":"\\*"},{"t":">> guess\r","k":"\\-"},{"t":"done_guessing\r","k":"=","l":"erin.done_guessing"},{"t":"<> She points at the at the TV now that the show has resumed. \"<i>That's</i> Junji.\"\r"},{"t":"There's a young unassuming boy with black hair on the screen. He doesn't look familiar.\r"},{"t":"\"Hmm. I don't recognize him.\"\r","k":"\\+"},{"t":"\"Yeah.. Sure. That guy.\" \r","k":"\\+"},{"t":"\"Yeah, whatever. I'm going to watch my show now.\" She waves you away.\r","k":"\\-"},{"t":"[Back]\r","k":"\\+","l":"erin.talked"}],"0.6.2":[{"t":"\"You don't remember me explaining it to you? Miren is from the moon and Junji is from Earth. They're both mech pilots and at war with each other, but they fall in love.\"\r"}],"0.6.3":[{"t":"\"That's the one!\"\r"}],"0.6.6":[{"t":"\"That's Gemini.\"\r"}],"0.6.7":[{"t":"\"Ugh. That's Kano. Nobody likes Kano.\"\r"}],"0.6.8":[{"t":"\"What? That's Asuka. She's a girl.\"\r"}],"0.6.9":[{"t":">> done_guessing\r"}],"0.6.17":[{"t":"As you stand up, she looks up at you. \"Since you're getting up, can you find me the remote? I want to turn up the volume.\"\r"},{"t":">> #living_room\r"}],"0.7":[{"t":"\"Okay. I hope you change your mind.\"\r"},{"t":">> go_back\r"}],"0.12":[{"t":">> #living_room\r"}]},"remote":{"0":[{"t":"It's the remote for the television. Erin is looking for this.\r"},{"t":"[Use]\r","k":"\\+"},{"t":"[Back]","k":"\\+"}],"0.1":[{"t":"if ($.bookmark === \"erin.remote\")\r","k":"~"},{"t":"else\r","k":"~"}],"0.1.0":[{"t":"[:&\r\n\t\t\t\tsadako.closeDialog(true);\r\n\t\t\t\tgame.move(null, \"remote\");\r\n\t\t\t:]\r"},{"t":"You hand the remote to Erin.\r"},{"t":"\"Thanks, $:name!\"\r"},{"t":"She points it at the TV and turns the volume up a couple notches. \"Ah. Much better.\"\r"},{"t":"[Back]\r","k":"\\+","l":"remote.gave"}],"0.1.0.4":[{"t":">> #living_room\r"}],"0.1.1":[{"t":"You can't find a use for the remote here.\r"},{"t":"[:& sadako.doLink(\"#inventory\") @: Back:] ~:choice\r"},{"t":"<< END\r"}],"0.2":[{"t":">> #inventory\r"}]},"story_data":{"tags":{"init":{},"inventory":{},"living_room":{"room":true},"erin":{},"remote":{}},"labels":{"init.enter_name":["init","0",1],"init.y":["init","0.10",3],"living_room.television":["living_room","0",5],"living_room.tv_back":["living_room","0",9],"living_room.erin_watching":["living_room","0",10],"living_room.couch":["living_room","0",14],"living_room.couch_back":["living_room","0",18],"living_room.rug":["living_room","0",19],"living_room.windows":["living_room","0",23],"living_room.go_back":["living_room","0",29],"living_room.gb":["living_room","0",30],"living_room.searched_couch":["living_room","0.17",1],"living_room.search_back":["living_room","0.17",2],"erin.remote":["erin","0",8],"erin.go_back":["erin","0",11],"erin.gb":["erin","0",12],"erin.guess":["erin","0.6",5],"erin.g1":["erin","0.6",6],"erin.g2":["erin","0.6",7],"erin.g3":["erin","0.6",8],"erin.done_guessing":["erin","0.6",11],"erin.talked":["erin","0.6",17],"remote.gave":["remote","0.1.0",4]},"depths":{"init.0.10":["init","0",11],"init.0.10.0":["init","0.10",1],"living_room.0.9":["living_room","0",10],"living_room.0.11":["living_room","0",12],"living_room.0.16":["living_room","0",18],"living_room.0.17":["living_room","0",18],"living_room.0.18":["living_room","0",19],"erin.0.3":["erin","0",5],"erin.0.4":["erin","0",5],"erin.0.6":["erin","0",8],"erin.0.7":["erin","0",8],"erin.0.6.2":["erin","0.6",4],"erin.0.6.3":["erin","0.6",4],"erin.0.6.6":["erin","0.6",10],"erin.0.6.7":["erin","0.6",10],"erin.0.6.8":["erin","0.6",10],"erin.0.6.9":["erin","0.6",10],"erin.0.6.14":["erin","0.6",16],"erin.0.6.15":["erin","0.6",16]},"version":"0.9.2"}};