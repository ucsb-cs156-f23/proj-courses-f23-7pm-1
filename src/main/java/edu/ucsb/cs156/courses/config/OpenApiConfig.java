package edu.ucsb.cs156.courses.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
  info = @Info(
  title = "Courses",
  description = """
    <p><a href='/'>Home Page</a></p>
    <p><a href='https://github.com/ucsb-cs156/proj-courses'>proj-courses on Github</a></p>
    <p><a href='/h2-console'>H2 Console (only on localhost)</a></p>
    """     
    ),
  servers = @Server(url = "/")
)
class OpenAPIConfig {}
