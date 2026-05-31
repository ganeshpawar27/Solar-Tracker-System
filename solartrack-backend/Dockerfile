# Step 1: Build the application using Maven and Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# -DskipTests के साथ हाइबरनेट वैलिडेशन को भी बिल्ड के समय स्किप करना
RUN mvn clean package -DskipTests -Dspring.autoconfigure.exclude=org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration

# Step 2: Run the application using OpenJDK 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# रेंडर डैशबोर्ड के वेरिएबल्स सीधे जावा ऐप को सौंपना
ENTRYPOINT ["java", "-jar", "app.jar"]