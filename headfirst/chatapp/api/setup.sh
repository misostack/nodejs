#!/usr/bin/env bash
echo ".................................."
echo "...............START..............."
echo ".................................."
from=.env.sample
declare -a List=(
                 "env"
                )
for env in "${List[@]}"
do
	to=".$env"
	echo -e "Copy $from to $to"
	search="ENV_NAME"
	replace="$env"
	sed "s/$search/$replace/g" $from > $to
done

echo -e "Copy firebaseServiceAccountKey.sample.json to firebaseServiceAccountKey.json"
cp "firebaseServiceAccountKey.sample.json" "firebaseServiceAccountKey.json"
echo ".................................."
echo "Replace firebaseServiceAccountKey.json with your service account key in firebase console."
echo "...............DONE..............."
echo ".................................."
