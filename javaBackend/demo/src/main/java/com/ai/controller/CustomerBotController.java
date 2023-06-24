package com.ai.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.ai.dto.ChatGPTRequest;
import com.ai.dto.ChatGPTResponse;

@RestController
public class CustomerBotController {
	
	@Value("${openai.model}")
	private String model;
	
	@Autowired
	private RestTemplate template;
	
	@Value("${openai.api.url}")
	private String apiURL;

	@GetMapping("/chat")
	public ResponseEntity<ChatGPTResponse> chat(@RequestParam("prompt") String prompt) {
		ChatGPTRequest request = new ChatGPTRequest("gpt-3.5-turbo",prompt);
		
	  ChatGPTResponse chatgptResponse =template.postForObject(apiURL, request, ChatGPTResponse.class);
	  return new ResponseEntity<>( chatgptResponse,HttpStatus.CREATED);
	}
}
