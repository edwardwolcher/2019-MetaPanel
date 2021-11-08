import json

topic_names = [
"Accessibility and Disability",
"Aging and Life Planning",
"America",
"Animals and Nature",
"Art and Design",
"Biography",
"Biology",
"Business and Economics",
"Climate and Sustainability",
"Culture Studies",
"Dance",
"Earth Science",
"Education",
"Family and Parenting",
"Fiction",
"Film",
"Food",
"Gender",
"Health and Medicine",
"History",
"Holiday",
"Housing and Homelessness",
"Humor",
"Illustration",
"Immigraiton",
"International",
"Language",
"Law and Criminal Justice",
"LGBTQIA+",
"Local",
"Math",
"Memoir",
"Music",
"News and Journalism",
"Pacific Northwest",
"Philosophy",
"Poetry and Literature",
"Politics and Government",
"Psychology",
"Race",
"Radio",
"Religion",
"Science",
"Seattle",
"Social Justice",
"Space and Astronomy",
"Sports and Games",
"Storytelling",
"Technology and Programming",
"Theater",
"Travel and Exploration",
"Urban Planning",
"War and Military",
"World History",
"World Politics",
"Youth"
]

topics = []

for topic in topic_names:

	with open(f'topics/{topic}.txt', 'r') as f:
		new_topic = {
		"topic": topic,
		"grafs": []
		}
		for graf in f:
			lines = graf.split('. ')
			new_topic["grafs"].append(lines)
		topics.append(new_topic)

with open('topics.json', 'w') as f:

	f.write(json.dumps(topics))
		