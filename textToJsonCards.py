import datetime
import json

def text_to_flashcards(text):
    # Split the text by lines and filter out any empty lines
    lines = [line.strip() for line in text.split('\n') if line.strip()]

    # Ensure we have an even number of lines
    if len(lines) % 2 != 0:
        raise ValueError("The input text does not have matching question-answer pairs.")

    # Convert pairs of lines to flashcard entries
    flashcards = []
    for i in range(0, len(lines), 2):
        card = {
            "Question": lines[i],
            "Answer": lines[i + 1]
        }
        flashcards.append(card)

    return flashcards

def generate_filename_with_timestamp(base_name="flashcards", extension="json"):
    # Get the current timestamp in a string format YYYYMMDD_HHMMSS
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{base_name}_{timestamp}.{extension}"

# Text Input (adjust to accept .txt file)
text = """
Acceptance Testing
The Beta testing stage of the SDP

Acceptance Testing
The Beta testing stage of the SDP

Acceptance Testing
The Beta testing stage of the SDP

"""

# Convert to Flashcards
cards = text_to_flashcards(text)

# Save the JSON to a file with a timestamp in the filename
filename = generate_filename_with_timestamp()
with open(filename, 'w') as file:
    json.dump(cards, file, indent=4)

print(f"Flashcards saved to: {filename}")
