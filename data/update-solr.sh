for file in $PWD/transformed/*
do
  echo "$file"
  ~/Code/Others/solr-5.2.1/bin/post -c rivers "$file"
done
echo "Complete!"