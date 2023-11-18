import openai
import json
import os
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.agents.agent_types import AgentType
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma
from langchain.document_loaders import JSONLoader,CSVLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain import PromptTemplate, LLMChain
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain.chains.question_answering import load_qa_chain
from langchain.callbacks import get_openai_callback
from langchain.agents import create_pandas_dataframe_agent
from langchain.document_loaders import DirectoryLoader
from langchain.agents import create_csv_agent
from langchain.memory import ConversationBufferMemory
from pandasai.llm.openai import OpenAI
from pandasai import PandasAI
from langchain.llms import HuggingFaceHub
from pandasai import SmartDataframe
from datetime import datetime
from pathlib import Path
import requests
import json
import csv
import logging
import pandas as pd
import json
import uuid
import re
from base64 import b64encode
import base64
import constants
from ZetarisAPI import *
from datavaultscripts import *
from flask import jsonify
global faiss_index, index, flag
bearer_token = None
refresh_token = None
api_url = None
os.environ["OPENAI_API_KEY"] = constants.OPENAI_API_KEY

#--------------------------------------------------------------------------------#
def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

#--------------------------------------------------------------------------------#

def get_vectorstore(text_chunks,pdffilenameforfolder):
	#embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
	embeddings = OpenAIEmbeddings()
	if not os.path.exists('pdf_faiss_files/'+pdffilenameforfolder):
		vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
		vectorstore.save_local('pdf_faiss_files/'+pdffilenameforfolder)
	else:
		vectorstore = FAISS.load_local('pdf_faiss_files/'+pdffilenameforfolder, embeddings=embeddings)
	return vectorstore

#--------------------------------------------------------------------------------#

def get_conversation_chain(vectorstore,query):
	retriever_from_llm = MultiQueryRetriever.from_llm(retriever=vectorstore.as_retriever(),
                                                  llm=ChatOpenAI(temperature=0))
	unique_docs = retriever_from_llm.get_relevant_documents(query=query)

	template = """Use the following pieces of context to answer the question at the end. 
	If you don't know the answer, just say that you don't know, don't try to make up an answer. 
	Use five sentences maximum and keep the answer as detailed as possible. Answer the question based on your own and data's predictive and prescriptive manner.
	{context}
	Question: {question}
	Helpful Answer:"""
	QA_CHAIN_PROMPT = PromptTemplate.from_template(template)

	llm = ChatOpenAI(model_name="gpt-4", temperature=0)
	qa_chain = RetrievalQA.from_chain_type(llm,retriever=retriever_from_llm,chain_type_kwargs={"prompt": QA_CHAIN_PROMPT})
	result = qa_chain({"query": query})
	return(result["result"].strip())
    # llm = HuggingFaceHub(repo_id="google/flan-t5-xxl", model_kwargs={"temperature":0.5, "max_length":512})
    # memory = ConversationBufferMemory(
    #     memory_key='chat_history', return_messages=True)
    # conversation_chain = ConversationalRetrievalChain.from_llm(
    #     llm=llm,
    #     retriever=vectorstore.as_retriever(),
    #     memory=memory
    # )
    # return conversation_chain

#--------------------------------------------------------------------------------#

def process_pdf_llm_questions(question,pdffilenames):
	output_file_name = "_".join([file[:-4][:5] if len(file) > 4 else file[:-4] for file in pdffilenames]) + ".txt"
	with open('pdf_data_files/'+output_file_name[:-4]+'.txt', 'r', encoding='utf-8') as file:
		raw_text = file.read()
	text_chunks = get_text_chunks(raw_text)
	vectorstore = get_vectorstore(text_chunks,output_file_name[:-4])
	print(vectorstore)
	res = get_conversation_chain(vectorstore,question)
	return res

