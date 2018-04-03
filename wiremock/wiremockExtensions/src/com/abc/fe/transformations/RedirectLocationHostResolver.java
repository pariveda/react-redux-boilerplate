package com.abc.fe.transformations;

import java.util.stream.Collectors;

import com.github.tomakehurst.wiremock.common.FileSource;
import com.github.tomakehurst.wiremock.extension.Parameters;
import com.github.tomakehurst.wiremock.extension.ResponseTransformer;
import com.github.tomakehurst.wiremock.http.HttpHeader;
import com.github.tomakehurst.wiremock.http.HttpHeaders;
import com.github.tomakehurst.wiremock.http.Request;
import com.github.tomakehurst.wiremock.http.Response;

public class RedirectLocationHostResolver extends ResponseTransformer {

	@Override
	public boolean applyGlobally() {
	    return false;
	}
	
	@Override
	public String getName() {
		return "RedirectLocationHostResolver";
	}

	@Override
	public Response transform(Request request, Response response, FileSource fileSource, Parameters parameters) {
		System.out.println("__--==Redirect Location Host Resolver==--__");
		HttpHeader originHeader = new HttpHeader("Access-Control-Allow-Origin", "*");
		String origin = request.getHeader("Origin");
		String location = response
				.getHeaders().all().stream()
				.filter(x -> x.keyEquals("Location"))
				.collect(Collectors.toList())
				.get(0).firstValue();
		String newHostUrl = origin + location;
		System.out.println("__--==Re-hosted URL==--__");
		System.out.println(newHostUrl);
		HttpHeader locationHeader = new HttpHeader("Location", newHostUrl);
		
		HttpHeaders headers = new HttpHeaders(originHeader, locationHeader);
		
		return Response.Builder.like(response)
                .but().headers(headers).build();
	}
}
