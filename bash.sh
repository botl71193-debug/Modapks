#==========================================================#
# MODIFIED FOR WEB MMK
#==========================================================#

cyan='\e[0;36m'
lightgreen='\e[1;32m'
red='\e[1;31m'
yellow='\e[1;33m'

clear
echo " "
echo " "
echo -e "\e[1m\e[33m"
echo "  ========================================================"
echo "                       ★ MMK ★                            "
echo "  ========================================================"
echo -e "\e[36m"
echo -e " \n  \033[1;90m00\033[1;93m0000000000000000000000000000000000000000000000000000000000\033[1;90m00\n  \033[1;92m00       \033[1;96mTEMA    : WEB MMK STYLE                       \033[1;92m     00\n  \033[1;95m00                                                          00\n  \033[1;94m00       \033[1;96mSTATUS  : ACTIVE                                   \033[1;94m     00\n  \033[1;90m00\033[1;93m0000000000000000000000000000000000000000000000000000000000\033[1;90m00\n"
echo " "
sleep 1.0

pip2 install lolcat
termux-setup-storage

cd /data/data/com.termux/files/usr/etc
rm bash.bashrc
cd $HOME
cd Modapks
cp bash.bashrc /data/data/com.termux/files/usr/etc

clear
echo -e "\e[1m\e[33m"
echo "  ========================================================"
echo "                       ★ MMK ★                            "
echo "  ========================================================"
echo -e "\e[36m" | lolcat
echo -e "\n  \033[1;90m00\033[1;93m0000000000000000000000000000000000000000000000000000000000\033[1;90m00\n  \033[1;92m00       \033[1;96mTEMA    : WEB MMK STYLE                       \033[1;92m     00\n  \033[1;95m00                                                          00\n  \033[1;94m00       \033[1;96mSTATUS  : ACTIVE                                   \033[1;94m     00\n  \033[1;90m00\033[1;93m0000000000000000000000000000000000000000000000000000000000\033[1;90m00\n" | lolcat

apt-get update -y
apt-get upgrade -y
pkg install nano -y
pkg install ruby -y
gem install lolcat
pkg install figlet -y

clear
echo "DONE BRO ENJOY" | lolcat
echo " "
sleep 0.2
clear
sleep 0.2
figlet -f big ' ★ MMK ★ ' | lolcat

echo "  CUSTOMIZE DONE NOW EXIT FROM TERMUX AND OPEN AGAIN AFTER 5 SECONDS" | lolcat
sleep 1.0
cd $HOME
exit