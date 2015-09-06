index=0
count=$(find $PWD/json/* -maxdepth 1 -type f | wc -l | xargs)

for file in $PWD/json/*
do
  ((index++))
  echo "Indexing $index of $count"
  $PWD/solr/bin/post -c rivers "$file"
done
echo "Complete!"