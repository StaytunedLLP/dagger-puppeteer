# Use the linuxserver/chromium image as the base image
FROM linuxserver/chromium:latest

# Set the working directory
WORKDIR /test

# Copy the local directory into the container
COPY ./test /test

# Update the package list
RUN apt-get update

# Install curl and unzip
RUN apt-get install -y curl unzip

# Install Deno
RUN sh -c "curl -fsSL https://deno.land/x/install/install.sh | sh"

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV DENO_INSTALL=/config/.deno
# Run the Deno script
CMD [ "sh", "-c", "/config/.deno/bin/deno run --allow-read --allow-env --allow-write --allow-run --allow-net --allow-sys /test/index.ts" ]