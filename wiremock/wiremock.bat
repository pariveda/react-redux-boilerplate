REM --proxy-all="https://abcorderdev.amerisourcebergen.com"
javac -d wiremockExtensions/bin -cp wiremock-standalone-2.6.0.jar wiremockExtensions/src/com/abc/fe/transformations/*.java
jar cvf wiremockExtensions.jar -C wiremockExtensions/bin com/abc/fe/transformations/
java -cp "wiremockExtensions.jar;wiremock-standalone-2.6.0.jar" com.github.tomakehurst.wiremock.standalone.WireMockServerRunner -port 9000 --proxy-all="http://cdahsap03.npd.amerisourcebergen.com:8001"