package edu.ucsb.cs156.courses.config;

import edu.ucsb.cs156.courses.entities.User;
import edu.ucsb.cs156.courses.repositories.UserRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Slf4j
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Value("${app.admin.emails}")
  private final List<String> adminEmails = new ArrayList<String>();

  @Autowired UserRepository userRepository;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests(authorize -> authorize.anyRequest().permitAll())
        .exceptionHandling(
            handlingConfigurer ->
                handlingConfigurer.authenticationEntryPoint(new Http403ForbiddenEntryPoint()))
        .oauth2Login(
            oauth2 ->
                oauth2.userInfoEndpoint(
                    userInfo -> userInfo.userAuthoritiesMapper(this.userAuthoritiesMapper())))
        .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
        .logout(
            logout ->
                logout
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutSuccessUrl("/"));
  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring().antMatchers("/h2-console/**");
  }

  private GrantedAuthoritiesMapper userAuthoritiesMapper() {
    return (authorities) -> {
      Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

      authorities.forEach(
          authority -> {
            log.info("********** authority={}", authority);
            mappedAuthorities.add(authority);
            if (OAuth2UserAuthority.class.isInstance(authority)) {
              OAuth2UserAuthority oauth2UserAuthority = (OAuth2UserAuthority) authority;

              Map<String, Object> userAttributes = oauth2UserAuthority.getAttributes();
              log.info("********** userAttributes={}", userAttributes);

              String email = (String) userAttributes.get("email");
              if (isAdmin(email)) {
                mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
              }

              if (email.endsWith("@ucsb.edu")) {
                mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));
              }
            }
          });
      return mappedAuthorities;
    };
  }

  public boolean isAdmin(String email) {
    if (adminEmails.contains(email)) {
      return true;
    }
    Optional<User> u = userRepository.findByEmail(email);
    return u.isPresent() && u.get().isAdmin();
  }
}
