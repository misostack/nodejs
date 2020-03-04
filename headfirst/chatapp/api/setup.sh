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
echo ".................................."
echo "...............DONE..............."
echo ".................................."
