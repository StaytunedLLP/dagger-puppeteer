# Use the linuxserver/chromium image as the base image
FROM linuxserver/chromium:latest

# Set the working directory
WORKDIR /test

# Copy the local directory into the container
COPY ./test /test

# Update the package list and install dependencies
RUN apt-get update && \
    apt-get install -y curl unzip && \
    rm -rf /var/lib/apt/lists/*

# Install Deno
RUN sh -c "curl -fsSL https://deno.land/x/install/install.sh | sh"

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    DENO_INSTALL=/config/.deno \
    PATH=$DENO_INSTALL/bin:$PATH

# Reset ENTRYPOINT and set CMD to open an interactive shell
ENTRYPOINT []
CMD ["sh"]