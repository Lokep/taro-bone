
echo "please select your execute env:" 
select input in pages components Exit;  

do  
  break  
done  
echo "You have selected $input"

sleep 1;
if [ "$input" = "Exit" ];then
  exit;
elif [ "$input" = "pages" ];then
  node_modules/plop/bin/plop.js $input
  node plop-templates/plop.js
else
  node_modules/plop/bin/plop.js $input
fi