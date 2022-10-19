import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { debug, getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const countItems = getAllByTestId('countItem');
      const [firstRepositoryCountItem, secondRepositoryCountItem] = countItems;

      // The debug function prints the rendered React tree in a user-friendly format.
      debug();
      // console.log('firstRepositoryItem', firstRepositoryItem);

      expect(repositoryItems).toHaveLength(2);
      expect(countItems).toHaveLength(2);

      // testing for firstRepository item
      expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik');
      expect(firstRepositoryItem).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(firstRepositoryItem).toHaveTextContent('TypeScript');
      expect(firstRepositoryCountItem).toHaveTextContent('21.9k');
      expect(firstRepositoryCountItem).toHaveTextContent('1.6k');
      expect(firstRepositoryCountItem).toHaveTextContent('88');
      expect(firstRepositoryCountItem).toHaveTextContent('3');

      // testing for secondRepository item
      expect(secondRepositoryItem).toHaveTextContent(
        'async-library/react-async'
      );
      expect(secondRepositoryItem).toHaveTextContent(
        'Flexible promise-based React data loader'
      );
      expect(secondRepositoryItem).toHaveTextContent('JavaScript');
      expect(secondRepositoryCountItem).toHaveTextContent('1.8k');
      expect(secondRepositoryCountItem).toHaveTextContent('69');
      expect(secondRepositoryCountItem).toHaveTextContent('72');
      expect(secondRepositoryCountItem).toHaveTextContent('3');
    });
  });
});
