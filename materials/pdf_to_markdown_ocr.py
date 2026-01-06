import os, base64, requests, fitz, time

PDF_PATH = "/Users/simonwang/Library/CloudStorage/OneDrive-HongKongBaptistUniversity/GTD/Areas/Teaching/Courses/MCCP 6020/materials/MCCP6020_2025-26sem1_TEACHER'S Folder/03_Course Materials/Session 2_Reviewing and Critically Evaluating the Literature/Supplementary materials/Writing a Critical Review.pdf"
OUTPUT_DIR = "/Users/simonwang/Library/CloudStorage/OneDrive-HongKongBaptistUniversity/GTD/Areas/Teaching/Courses/MCCP 6020/materials/MachineReadableMat/03_Course Materials/Session 2_Reviewing and Critically Evaluating the Literature/Supplementary materials"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "Writing a Critical Review_LLM_Formatted.md")
API_KEY_FILE = "/Users/simonwang/Library/CloudStorage/OneDrive-HongKongBaptistUniversity/GTD/Resources/Tools/LLM/BLTkey.md"
HOWTO_FILE = "/Users/simonwang/Library/CloudStorage/OneDrive-HongKongBaptistUniversity/GTD/Resources/Tools/LLM/howto.md"
MODEL_NAME = "gpt-4o"

def get_api_config():
    with open(API_KEY_FILE, "r") as f: api_key = f.read().strip()
    with open(HOWTO_FILE, "r") as f: base_url = f.read().strip()
    return api_key, base_url

def process():
    api_key, base_url = get_api_config()
    if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR, exist_ok=True)
    doc = fitz.open(PDF_PATH)
    headers = {"Authorization": "Bearer " + api_key, "Content-Type": "application/json"}
    all_md = []
    NL = chr(10)
    for i in range(len(doc)):
        page_num = i + 1
        print("Page " + str(page_num))
        pix = doc.load_page(i).get_pixmap(matrix=fitz.Matrix(2, 2))
        img_str = base64.b64encode(pix.tobytes("png")).decode("utf-8")
        payload = {
            "model": MODEL_NAME,
            "messages": [{"role": "user", "content": [
                {"type": "text", "text": "OCR to Markdown. Return ONLY markdown."},
                {"type": "image_url", "image_url": {"url": "data:image/png;base64," + img_str}}
            ]}],
            "max_tokens": 4096,
            "temperature": 0.1
        }
        try:
            r = requests.post(base_url + "/v1/chat/completions", headers=headers, json=payload)
            r.raise_for_status()
            text = r.json()["choices"][0]["message"]["content"]
            if "```" in text:
                parts = text.split("```")
                if len(parts) >= 3:
                    text = parts[1]
                    if text.startswith("markdown"): text = text[8:]
                    elif text.startswith("md"): text = text[2:]
                    text = text.strip()
            # Use NL variable for newlines
            entry = NL + NL + "<!-- Page " + str(page_num) + " -->" + NL + NL + text + NL + NL
            all_md.append(entry)
            print("Done " + str(page_num))
        except Exception as e:
            all_md.append(NL + NL + "<!-- Error " + str(page_num) + ": " + str(e) + " -->" + NL + NL)
            print("Error " + str(page_num) + ": " + str(e))
        with open(OUTPUT_FILE, "w") as f:
            f.write("# Writing a Critical Review" + NL + NL)
            f.writelines(all_md)
        time.sleep(1)
    doc.close()
    print("Finished")

if __name__ == "__main__": process()
