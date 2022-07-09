FROM node:16.3.0-alpine

# WORKDIR Must mimick the main development repository, because of the
# way git submodules work: the submodule repo don't have a .git
# directory, instead, it has a .git file pointing to the .git dir of
# the parent repository.
# Something like this: 'gitdir: ../../.git/modules/services/sendemail'
# This way, if you want to run git inside the
# container, you must properly map the .git directory of the service
# to the root of this container, and keep the directory structure
# *exactly* like the parent directory.
# See docker-compose on development repository to more info.
WORKDIR /scheduling

COPY package.json .
COPY package-lock.json .

RUN npm install --force

COPY . .

CMD npm run start:dev