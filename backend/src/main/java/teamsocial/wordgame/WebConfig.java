package teamsocial.wordgame;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurerAdapter() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOriginPatterns("http://localhost:3000");
      }

      @Override
      public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:^[a-zA-Z\\d-_]+}")
                .setViewName("forward:/");
        registry.addViewController("/**/{spring:^[a-zA-Z\\d-_]+}")
                .setViewName("forward:/");
        registry.addViewController("/{spring:^[a-zA-Z\\d-_]+}/**{spring:?!(\\.js|\\.css)$}")
                .setViewName("forward:/");
      }
    };
  }
}