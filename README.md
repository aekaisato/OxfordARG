# OxfordARG

Escape room / game for school, made for PTSA.

## Running

Since I'm going to be sharing the codebase, I thought it may be a good idea to share how to run it.

### Preparation

You need nodejs and npm installed on your system, first of all.
For me on EndeavourOS, I just run `yay -S nodejs npm`, but I think for Windows you'd need to use an installer. It shouldn't be hard to figure out.

After that, you need to globally install expo-cli. You can do this by running `npm install -g expo-cli` (In Windows, I think this has to be in an Administrator PowerShell/CMD. On Linux, you should use sudo.)

The code for the game itself is in the oxford-arg-ui subfolder. Open a terminal window there (or `cd` to it). Run `npm install` to install all of the necessary libraries.

### Running

Still in the oxford-arg-ui subfolder, you can start the dev server using `expo start`. Once you see the QR code, press `w` to compile the JavaScript for web. A tab should open with the game.
