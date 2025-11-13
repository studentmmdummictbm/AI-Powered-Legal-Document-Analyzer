# AI-Powered Legal Document Analyzer

An industry-grade Data Science & NLP project designed to automatically analyze legal documents. This system summarizes documents, extracts key clauses, and identifies potential risks using advanced transformer-based models and custom NER pipelines. Built end-to-end from data collection to model deployment.

---

## 🚀 Project Overview

Legal professionals often spend hours reviewing long contracts and court documents. This process is slow, costly, and vulnerable to human error.

This project provides an AI-driven automated solution:

### ✔ Summarizes long legal documents  
### ✔ Extracts important clauses  
### ✔ Highlights risky or non-standard content  
### ✔ Provides a clean, web-based analysis interface  

---

## 🎯 Key Features

### 🔹 1. Abstractive Document Summarization
- Fine-tuned T5/BART models  
- Produces concise and meaningful summaries  

### 🔹 2. Clause Extraction (NER-Based)
Detects clauses such as:
- Indemnity  
- Governing Law  
- Confidentiality  
- Termination  
- Payment Terms  

Built using:
- spaCy NER  
- Transformer-based NER (BERT-style models)

### 🔹 3. Risk Analysis
- Flags suspicious or unusual clause language  
- Uses a hybrid of rule-based logic + ML classifier  

### 🔹 4. Web Application
- Simple Flask/Streamlit UI  
- Accepts PDF uploads  
- Shows structured results with summaries, clauses, and risks  

---

## 🧠 Technical Architecture

### **📌 Data Sources**
- SEC EDGAR (Contracts)
- CourtListener (Court Opinions)
- Custom manually annotated clause dataset

---

### **📌 Machine Learning Workflow**

#### 1. Data Preprocessing
- PDF → text conversion  
- Cleaning and normalization  
- Tokenization & segmentation  

#### 2. Model Training
- Summarization model (T5/BART)  
- NER model (spaCy / BERT)  
- Risk classification model  

#### 3. Evaluation
- ROUGE (summarization)  
- Precision/Recall/F1 (NER)  
- Accuracy/Confusion Matrix (risk model)

---

## 🏗 Project Structure

```
📦 AI-Legal-Document-Analyzer
├── data/
│   ├── raw/
│   └── processed/
├── models/
│   ├── summarizer/
│   ├── ner/
│   └── risk_analyzer/
├── src/
│   ├── preprocessing/
│   ├── summarization/
│   ├── clause_extraction/
│   ├── risk_analysis/
│   └── web_app/
├── app.py
├── requirements.txt
└── README.md
```

---

## 🛠 Tech Stack

- **Python**  
- **Hugging Face Transformers**  
- **spaCy**  
- **PyTorch / TensorFlow**  
- **Scikit-Learn**  
- **Flask / Streamlit**  
- **PyPDF2 / pdfminer**  

---

## 🌐 Deployment Options

- Streamlit Cloud  
- Render / Railway  
- Docker container  
- Local deployment  

---

## 📥 Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/AI-Legal-Document-Analyzer.git
cd AI-Legal-Document-Analyzer
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run the Application
```bash
python app.py
```

---

## 🧪 Future Enhancements

- Multi-language legal document support  
- OCR for scanned PDFs  
- Clause comparison engine  
- Better visualization dashboards  
- Larger fine-tuned legal domain LLMs  

---

## 🤝 Contributing

Contributions are welcome!  
Submit issues or pull requests to improve the project.

---

## 📜 License

Licensed under the **MIT License**.

---

## 🙏 Acknowledgements

Special thanks to:
- Public datasets (SEC EDGAR, CourtListener)  
- Hugging Face & spaCy open-source communities  

