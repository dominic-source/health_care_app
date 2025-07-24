import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import os
import joblib


def train_my_model():
    data = pd.read_csv("data/symptoms_dataset.csv")
    print(f"Data loaded with {len(data)} records.")

    X_train, X_test, y_train, y_test = train_test_split(
        data['symptoms'], data['disease'],
        test_size=0.2, random_state=43
    )

    model_pipeline = Pipeline([
        ("vectorizer", TfidfVectorizer(
            max_features=5000,
            ngram_range=(1, 2),
            stop_words='english'
        )),
        ("classifier", MultinomialNB(alpha=0.1))
    ])

    print("Model training started...")
    model_pipeline.fit(X_train, y_train)
    print("Model training completed.")

    # Evaluet the performance of the training
    train_accuracy = model_pipeline.score(X_train, y_train)
    test_accuracy = model_pipeline.score(X_test, y_test)

    print(f"Training accuracy: {train_accuracy:.2f}")
    print(f"Testing accuracy: {test_accuracy:.2f}")
    joblib.dump(model_pipeline, "model/symptom_model.pkl")
    print("Model saved to 'model/symptom_model.pkl'.")

if __name__ == "__main__":
    train_my_model()